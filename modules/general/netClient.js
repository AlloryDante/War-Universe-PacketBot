const net = require("net");
const EventEmitter = require("events");
const launchJAR = require("../../utils/jarLauncher");
const generateUUIDFromString = require("../../utils/uidForger");

class Client extends EventEmitter {
  constructor(username, pass, serverId = "eu1") {
    super();
    this.jarSocket = null;
    this.buffer = "";
    this.clientConnected = false;
    this.token = null;
    this.username = username;
    this.pass = pass;
    this.serverId = serverId;
    this.serverIP = null;
    this.serverPort = null;
    this.baseUrl = null;

    this.clientVersion = [1, 233, 0];
    this.clientMD5 = "269980fe6e943c59e8ff10338f719870";
    this.isRunning = false;
  }

  async fetchMetaInfo() {
    try {
      const response = await fetch("https://eu.api.waruniverse.space/meta-info");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const gameServer = data.gameServers.find((server) => server.id === this.serverId);
      const loginServer = data.loginServers.find((server) => server.gameServerId === this.serverId);

      if (!gameServer || !loginServer) {
        throw new Error(`Invalid server ID: ${this.serverId}`);
      }

      this.serverIP = gameServer.host;
      this.serverPort = gameServer.port;
      this.baseUrl = loginServer.baseUrl;

      const [major, minor, patch] = data.lastClientVersion.split(".").map(Number);
      this.clientVersion = [major, minor, patch];
    } catch (error) {
      console.error("Error fetching meta info:", error);
      throw error;
    }
  }

  async start() {
    await this.fetchMetaInfo();
    this.token = await this.login(this.username, this.pass);
    if (!this.token) {
      throw new Error(`Login failed ${this.username}`);
    }

    this.startServer(this.port);
  }

  startServer(port) {
    this.server = net.createServer((socket) => {
      if (this.jarSocket) {
        return;
      }

      this.jarSocket = socket;

      this.sendPacket("startClient", {
        host: this.serverIP,
        port: this.serverPort,
      });

      socket.on("data", (data) => this.handleData(data));
      socket.on("end", () => {
        console.log("[JAR] JAR disconnected...");
        this.jarSocket = null;
      });
      socket.on("error", (err) => console.error("Socket error:", err));
    });

    this.server.listen(0, "127.0.0.1", () => {
      const port = this.server.address().port;
      console.log(`[Client] Server listening on port ${port}`);
      launchJAR("127.0.0.1", port);
    });
  }

  sendAuth() {
    console.log("[Kryio] Authentificating...");
    this.sendPacket("ApiRequestPacket", {
      requestId: 1,
      uri: "auth/token-login",
      requestDataJson: {
        token: this.token,
        clientInfo: {
          uid: generateUUIDFromString(this.username),
          build: 0,
          version: this.clientVersion,
          platform: "Desktop",
          systemLocale: "en_US",
          preferredLocale: "en",
          clientHash: this.clientMD5,
        },
      },
    });
  }
  handleData(data) {
    this.buffer += data.toString("utf8");
    let boundary = this.buffer.indexOf("\n");
    while (boundary !== -1) {
      const jsonString = this.buffer.substring(0, boundary).trim();
      this.buffer = this.buffer.substring(boundary + 1);
      boundary = this.buffer.indexOf("\n");
      try {
        const packet = JSON.parse(jsonString);

        //if (packet.type === "GameStateResponsePacket") return;
        if (packet.type === "event") {
          console.log(`[JAR Event] ${packet.type} - ${packet.event}`);
          if (packet.event === "connected") {
            this.emit("kryo_connected");
            this.sendAuth();
          }
          return;
        }
        if (packet.type === "AuthAnswerPacket" && packet.payload.success) {
          this.clientLoaded = true;
          this.emit("loaded");
          console.log(`[Kryio] Client Loaded`);
        }
        this.emit("kryo_packet", packet.type, packet.payload);
        if (packet.type === "ApiNotification" && packet.payload.key === "logged-in-from-another-device") {
          this.emitDisconnected();
        }
      } catch (err) {
        console.log(err);
        console.error("[ERROR] JSON parse error:", jsonString);
      }
    }
  }

  emitDisconnected() {
    this.emit("disconnected");
  }

  sendPacket(endpoint, packet) {
    if (this.jarSocket) {
      if (endpoint == "UserActionsPacket" || endpoint == "ResourcesActionRequestPacket") {
        this.jarSocket.write(`${endpoint}|${JSON.stringify(packet)}\n`, "utf8");
      } else {
        this.jarSocket.write(`${endpoint}|${stringifyObject(packet)}\n`, "utf8", () => {
          //console.log(`${endpoint}(S):${JSON.stringify(packet)}\n`);
        });
      }
    } else {
      console.error("[net] JAR Socket is not connected");
    }
  }

  connect() {
    if (!this.clientConnected) {
      console.log(`[Kryio] Connecting the client...`);
      this.sendPacket("startClient", {
        host: this.serverIP,
        port: this.serverPort,
      });
      this.clientConnected = true;
    } else {
      console.log(`[Kryio] Cannot connect a client that is already connected`);
    }
  }
  disconnect() {
    if (this.clientConnected && this.clientLoaded) {
      console.log(`[Kryio] Disconnecting Client`);
      this.sendPacket("stopClient", {});
      this.clientConnected = false;
      this.clientLoaded = false;
    } else {
      console.log(`[Kryio] Cannot disconnect a client that is not connected and loaded`);
    }
  }
  async login(username, pass) {
    const url = `${this.baseUrl}/auth-api/v3/login/${username}/token?password=${pass}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Login HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.tokenId + ":" + data.token;
      return token;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}

function stringifyObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = JSON.stringify(obj[key], 2);
    }
  }
  return JSON.stringify(obj);
}
module.exports = Client;
