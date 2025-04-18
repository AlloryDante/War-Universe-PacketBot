const fs = require("fs");
const path = require("path");

module.exports = class AdminScaners {
  constructor(client, username, serverId) {
    this.client = client;
    this.username = username;
    this.serverId = serverId;

    this.init();
  }

  init() {
    this.client.on("kryo_packet", (type, payload) => {
      if (type != "GameEvent") return;
      if (payload.id != 16) return;
      const room = payload.data[0];
      const author = payload.data[1];
      const msg = payload.data[2];
      const status = payload.data[3];

      if (room != "bb" && room != "aa") return;
      console.log(`Admin Scan Request: ${author}: ${msg} | ${status}`);

      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] User: ${this.username} | Server: ${this.serverId}\nRoom: ${room} | Author: ${author} | Message: ${msg} | Status: ${status}\n-------------------\n`;

      fs.appendFile(path.join(__dirname, "../../adminScanningReports.txt"), logEntry, "utf8", (err) => {
        if (err) console.error("Error writing to log file:", err);
      });
    });
  }
};
