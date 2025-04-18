package com.wupacketbot;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class NodeJsClient {
    private Socket socket;
    private DataOutputStream outputStream;
    private DataInputStream inputStream;

    public NodeJsClient(String host, int port) throws IOException {
        this.socket = new Socket(host, port);
        this.outputStream = new DataOutputStream(socket.getOutputStream());
        this.inputStream = new DataInputStream(socket.getInputStream());
    }

    public void sendPacket(String packet) throws IOException {
        byte[] data = (packet + "\n").getBytes(StandardCharsets.UTF_8);
        outputStream.write(data);
        outputStream.flush();
    }

    public String receivePacket() throws IOException {
        byte[] buffer = new byte[4096]; // Adjust buffer size as needed
        int bytesRead = inputStream.read(buffer);
        if (bytesRead == -1) {
            throw new IOException("End of stream reached");
        }
        String response = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);
        return response;
    }

    public void close() throws IOException {
        inputStream.close();
        outputStream.close();
        socket.close();
    }
}
