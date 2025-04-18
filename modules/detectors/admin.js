const { calculateDistanceBetweenPoints } = require("../../utils/functions");

module.exports = class Admin {
  constructor(client, scene, stateManager, settingsManager) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;

    this.state.detectors.admin.adminDetected = false;
    this.companyID = 0;
    this.reportedAdmins = new Map(); // Map of mapName -> { ships: Set of ship IDs, timestamp: number }
    this.RESET_INTERVAL = 20 * 60 * 1000; // 20 minutes in milliseconds
  }

  start() {
    if (this.state.detectors.admin.enabled) return;
    this.state.detectors.admin.enabled = true;
    this.activateWatchLoop();
  }

  stop() {
    this.state.detectors.admin.enabled = false;
    this.resetState();
  }

  resetState() {
    this.companyID = 0;
    this.state.detectors.admin.adminDetected = false;
    this.reportedAdmins.clear();
  }

  async activateWatchLoop() {
    while (this.state.detectors.admin.enabled) {
      await this.handleAdminDetection();
      await delay(100); // Check every 100ms
    }
  }

  async handleAdminDetection() {
    const adminShips = Object.values(this.scene.ships).filter((ship) => ship.droneArray > 8 || ship.name == "Curunir" || ship.name == "Vicc" || ship.name == "Dayn");
    const currentMap = this.scene.currentMap;
    const currentTime = Date.now();
    // Check and reset if map data is older than 1 hour
    this.checkAndResetMapData(currentMap, currentTime);

    if (adminShips.length > 0) {
      const newAdminShips = this.processNewAdminShips(adminShips, currentMap, currentTime);

      if (newAdminShips.length > 0) {
        await this.sendWebhook(newAdminShips, currentMap);
      }
      this.state.detectors.admin.adminDetected = true;
    } else {
      this.state.detectors.admin.adminDetected = false;
    }
  }

  checkAndResetMapData(currentMap, currentTime) {
    if (this.reportedAdmins.has(currentMap)) {
      const mapData = this.reportedAdmins.get(currentMap);
      if (currentTime - mapData.timestamp >= this.RESET_INTERVAL) {
        this.reportedAdmins.delete(currentMap);
      }
    }
  }

  processNewAdminShips(adminShips, currentMap, currentTime) {
    if (!this.reportedAdmins.has(currentMap)) {
      this.reportedAdmins.set(currentMap, {
        ships: new Set(),
        timestamp: currentTime,
      });
    }

    const mapData = this.reportedAdmins.get(currentMap);
    const newAdminShips = adminShips.filter((ship) => !mapData.ships.has(ship.id));

    // Add new ships to reported set
    newAdminShips.forEach((ship) => mapData.ships.add(ship.id));

    return newAdminShips;
  }

  async sendWebhook(adminShips, mapName) {
    if (!global.discordId) {
      console.log(`🚨 Admin Alert: ${adminShips.length} admin${adminShips.length > 1 ? "s" : ""} detected on map ${mapName}`);
      return;
    }
    const webhookUrl = "https://discord.com/api/webhooks/1315354328898338877/Mr2HEoT5dQiNPa0flY5d29JfUS_u6bgw3_t3BlKEmc4IWBKRiDjF9VglO3cNkeiYq9i0";
    const message = {
      content: `🚨 Admin Alert: ${adminShips.length} admin${adminShips.length > 1 ? "s" : ""} detected on map ${mapName} server ${this.client.serverId} by <@${global.discordId}>\n` + `Detected <t:${Math.floor(Date.now() / 1000)}:R> at <t:${Math.floor(Date.now() / 1000)}:f>`,
      embeds: [
        {
          description: adminShips.map((ship) => `Ship Position (X, Y): ${parseInt(ship.x / 100)}, ${parseInt(ship.y / 100)}`).join("\n"),
          color: 0xff0000,
        },
      ],
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error("Failed to send webhook:", error);
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
