package com.wupacketbot;

import com.esotericsoftware.kryonet.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.spaiowenta.commons.api.ApiRequestPacket;
import com.spaiowenta.commons.packets.ChangeCredentialsRequest;
import com.spaiowenta.commons.packets.CollectableCollectRequest;
import com.spaiowenta.commons.packets.RepairRequestPacket;
import com.spaiowenta.commons.packets.RocketSwitchRequest;
import com.spaiowenta.commons.packets.UserActionsPacket;
import com.spaiowenta.commons.packets.chat.ChatMessageRequest;
import com.spaiowenta.commons.packets.equip.EquipRequestPacket;
import com.spaiowenta.commons.packets.equip.ResourcesActionRequestPacket;
import com.spaiowenta.commons.packets.stats.StatsRequest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static Client client;

    private static final Map<String, Class<?>> endpointClassMap = new HashMap<>();
    private static NodeJsClient nodeJsClient;
    private static String buffer = "";

    static {
        // Initialize the map with endpoint to class mappings
        endpointClassMap.put("ApiRequestPacket", ApiRequestPacket.class);
        endpointClassMap.put("UserActionsPacket", UserActionsPacket.class);
        endpointClassMap.put("StatsRequest", StatsRequest.class);
        endpointClassMap.put("ChangeCredentialsRequest", ChangeCredentialsRequest.class);
        endpointClassMap.put("CollectableCollectRequest", CollectableCollectRequest.class);
        endpointClassMap.put("ResourcesActionRequestPacket", ResourcesActionRequestPacket.class);
        endpointClassMap.put("RepairRequestPacket", RepairRequestPacket.class);
        endpointClassMap.put("RocketSwitchRequest", RocketSwitchRequest.class);
        endpointClassMap.put("EquipRequestPacket", EquipRequestPacket.class);
        endpointClassMap.put("ChatMessageRequest", ChatMessageRequest.class);
        // Add other mappings as needed
    }

    public static void main(String[] args) {
        if (args.length < 2) {
            System.err.println("Usage: java -jar wupacket-1.0-SNAPSHOT.jar <nodeJsHost> <nodeJsPort>");
            return;
        }

        String nodeJsHost = args[0];
        int nodeJsPort = Integer.parseInt(args[1]);

        try {
            // Initialize the NodeJsClient to connect to the Node.js server
            nodeJsClient = new NodeJsClient(nodeJsHost, nodeJsPort);
            new Thread(() -> {
                try {
                    while (true) {
                        String response = nodeJsClient.receivePacket();
                        buffer += response; // Append new data to the buffer

                        int boundary;
                        while ((boundary = buffer.indexOf("\n")) != -1) {
                            String packet = buffer.substring(0, boundary).trim();
                            buffer = buffer.substring(boundary + 1);
                            handlePacket(packet);
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void startClient(String host, int port) {
        client = new RegisterHook();

        // Add listener for incoming packets
        client.addListener(new Listener() {
            public void connected(Connection connection) {
                try {
                    nodeJsClient.sendPacket("{\"type\":\"event\",\"event\":\"connected\"}");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void received(Connection connection, Object object) {
                try {
                    if (object instanceof com.esotericsoftware.kryonet.FrameworkMessage.KeepAlive) {
                        return;
                    }
                    String json = objectMapper.writeValueAsString(object);
                    ObjectNode jsonObject = objectMapper.createObjectNode();
                    jsonObject.put("type", object.getClass().getSimpleName());
                    jsonObject.set("payload", objectMapper.readTree(json));
                    nodeJsClient.sendPacket(objectMapper.writeValueAsString(jsonObject));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        client.start();
        try {
            client.connect(3000, host, port);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void stopClient() {
        if (client != null) {
            client.stop();
            client = null;
            try {
                nodeJsClient.sendPacket("{\"type\":\"event\",\"event\":\"krio_disconnected\"}");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void handlePacket(String packet) {
        try {
            String[] parts = packet.split("\\|", 2); // Split into endpoint and payload
            if (parts.length != 2) {
                throw new IllegalArgumentException("Invalid packet format");
            }
            String endpoint = parts[0];
            String payload = parts[1];

            if ("startClient".equals(endpoint)) {
                JsonNode jsonNode = objectMapper.readTree(payload);
                String host = jsonNode.get("host").asText();
                int port = jsonNode.get("port").asInt();
                startClient(host, port);
            } else if ("stopClient".equals(endpoint)) {
                stopClient();
            } else {
                sendPacket(endpoint, payload);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendPacket(String endpoint, String payload) {
        try {
            if (payload == null || payload.isEmpty()) {
                throw new IllegalArgumentException("Payload is null or empty");
            }
            if ("RepairRequestPacket".equals(endpoint)) {
                client.sendTCP(new RepairRequestPacket());
                return;
            }

            if ("ResourcesActionRequestPacket".equals(endpoint)) {
                JsonNode payloadNode = objectMapper.readTree(payload);
                JsonNode dataNode = payloadNode.get("data");
                ResourcesActionRequestPacket resourcesActionRequestPacket = new ResourcesActionRequestPacket();
                if (dataNode != null && dataNode.isArray()) {
                    resourcesActionRequestPacket.actionId = payloadNode.get("actionId").asInt();

                    int[] dataArray = new int[dataNode.size()];
                    for (int i = 0; i < dataNode.size(); i++) {
                        dataArray[i] = dataNode.get(i).asInt();
                    }
                    resourcesActionRequestPacket.data = dataArray;
                }
                client.sendTCP(resourcesActionRequestPacket);
                return;
            }

            JsonNode payloadNode = objectMapper.readTree(payload);
            Class<?> packetClass = endpointClassMap.get(endpoint);
            if (packetClass != null) {

                // if (packetClass.getName() ==
                // "com.spaiowenta.commons.packets.equip.ResourcesActionRequestPacket") {
                // System.out.println("Sending payload...........");
                // ResourcesActionRequestPacket resourcesActionRequestPacket = new
                // ResourcesActionRequestPacket();
                // resourcesActionRequestPacket.actionId = 4;
                // resourcesActionRequestPacket.data = new int[] { 0, 1 };
                // client.sendTCP(resourcesActionRequestPacket);
                // return;
                // }
                Object packet = objectMapper.treeToValue(payloadNode, packetClass);
                client.sendTCP(packet);
            } else {
                System.out.println("Java: Endopoint " + endpoint + " not found!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}