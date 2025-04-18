const { calculateDistanceBetweenPoints } = require("../../utils/functions");
const mapConfigurations = require("../../utils/mapRegions");

module.exports = class Escape {
  constructor(client, scene, navigation, config, stateManager, settingsManager, stats) {
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.config = config;
    this.state = stateManager;
    this.settings = settingsManager;
    this.stats = stats;

    this.state.escape.enabled = false;
    this.state.escape.waitedTime = 0;

    this.callback = null;
  }

  start(callback) {
    if (this.state.escape.enabled) return;
    this.state.escape.enabled = true;
    this.activateEscapeLoop();
    this.callback = callback;
  }

  stop() {
    this.state.escape.enabled = false;
    this.callback = null;
    this.state.escape.waitedTime = 0;
  }

  async activateEscapeLoop() {
    while (this.state.escape.enabled) {
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
      if (dev) console.log("ESCAPE: In safe zone");

      while (!this.state.detectors.enemy.enemyDetected) {
        await delay(1000);
        this.state.escape.waitedTime += 1000;
        console.log(`Enemy left. Waiting for ${this.state.escape.waitedTime}ms, waited ${this.state.escape.waitedTime / 1000}s`);
        this.stats.messageState = `Escaping - Enemy left. Waiting for ${this.state.escape.waitedTime / 1000}s`;
        if (this.state.escape.waitedTime >= this.settings.escape.delay) {
          if (this.callback) this.callback();
          this.stop();
          return;
        }
      }
      this.state.escape.waitedTime = 0;
      this.stats.messageState = "Escaping - In safe zone, but enemy detected";
    } else if (playerShip.x === closestPortal.x && playerShip.y === closestPortal.y) {
      if (dev) console.log("ESCAPE: At portal but not in safe zone");
      this.stats.messageState = "Escaping - At portal but not in safe zone";
      if (isBeingAttacked) {
        if (dev) console.log("ESCAPE: Being attacked by player, jumping through portal");
        this.stats.messageState = "Escaping - Being attacked by player, jumping through portal";
        this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 6 }] });
        await delay(6000);
        this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 6 }] });
      }
    } else {
      if (dev) console.log(`Escape - Moving to closest portal at (${closestPortal.x}, ${closestPortal.y})`);
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
