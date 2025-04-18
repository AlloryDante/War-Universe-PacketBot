const { calculateDistanceBetweenPoints } = require("../../utils/functions");
const mapConfigurations = require("../../utils/mapRegions");

module.exports = class AdminEscape {
  constructor(client, scene, navigation, config, stateManager, settingsManager, stats) {
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.config = config;
    this.state = stateManager;
    this.settings = settingsManager;
    this.stats = stats;

    this.state.admin.enabled = false;
    this.state.admin.waitedTime = 0;

    this.callback = null;
  }

  start(callback) {
    if (this.state.admin.enabled) return;
    this.state.admin.enabled = true;
    this.activateEscapeLoop();
    this.callback = callback;
  }

  stop() {
    this.state.admin.enabled = false;
    this.callback = null;
    this.state.admin.waitedTime = 0;
  }

  async activateEscapeLoop() {
    while (this.state.admin.enabled) {
      await this.update();
      await delay(100);
    }
  }

  async update() {
    const playerShip = this.scene.getPlayerShip();
    if (!playerShip) return;

    const currentMap = this.scene.currentMap;
    if (!mapConfigurations[currentMap]) {
      console.log(`No portals defined for map: ${currentMap}`);
      return;
    }

    const portals = mapConfigurations[currentMap];
    const closestPortal = this.findClosestPortal(playerShip, portals);

    if (!closestPortal) return;

    // Check if player is being attacked
    const isBeingAttacked = Object.values(this.scene.ships).some((ship) => ship.selected === this.scene.playerId && ship.isAttacking && !ship.name.includes("-=("));

    if (this.scene.safeZone) {
      if (dev) console.log("AdminEscape: In safe zone");

      while (!this.state.detectors.admin.adminDetected) {
        await delay(1000);
        this.state.admin.waitedTime += 1000;
        const remainingMinutes = Math.ceil((this.settings.admin.delay * 60 * 1000 - this.state.admin.waitedTime) / (60 * 1000));
        console.log(`Admin left. Waiting for ${remainingMinutes} minutes`);
        this.stats.messageState = `AdminEscape - Admin left. Waiting for ${remainingMinutes} minutes`;
        if (this.state.admin.waitedTime >= this.settings.admin.delay * 60 * 1000) {
          if (this.callback) this.callback();
          this.stop();
          return;
        }
      }
      this.state.admin.waitedTime = 0;
      this.stats.messageState = "AdminEscape - In safe zone, but admin detected";
    } else if (playerShip.x === closestPortal.x && playerShip.y === closestPortal.y) {
      console.log("AdminEscape: At portal but not in safe zone");
      this.stats.messageState = "AdminEscape - At portal but not in safe zone";
      if (isBeingAttacked) {
        console.log("AdminEscape: Being attacked by player, jumping through portal");
        this.stats.messageState = "AdminEscape - Being attacked by player, jumping through portal";
        this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 6 }] });
      }
    } else {
      console.log(`Moving to closest portal at (${closestPortal.x}, ${closestPortal.y})`);
      this.config.switchFleeMode();
      await this.navigation.move(closestPortal.x, closestPortal.y);
    }
  }

  findClosestPortal(playerShip, portals) {
    let closestPortal = null;
    let shortestDistance = Infinity;

    for (const portal of portals) {
      // Skip portals leading to PvP zones
      if (portal.to === "T-1" || portal.to === "G-1") continue;

      const distance = calculateDistanceBetweenPoints(playerShip.x, playerShip.y, portal.x, portal.y);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestPortal = portal;
      }
    }

    return closestPortal;
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
