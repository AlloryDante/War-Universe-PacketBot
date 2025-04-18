const { calculateDistanceBetweenPoints } = require("../../utils/functions");
const mapConfigurations = require("../../utils/mapRegions");

module.exports = class Recover {
  constructor(client, scene, navigation, config, stateManager, stats) {
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.config = config;
    this.state = stateManager;
    this.stats = stats;

    this.state.recover.enabled = false;
    this.state.recover.fullHealth = false;
    this.state.recover.configSwitched = false;
    this.lastHealthMessage = 0;
  }

  start() {
    if (this.state.recover.enabled) return;
    this.state.recover.enabled = true;
    this.state.recover.fullHealth = false;
    console.log("Recovering started");
    this.activateRecoverLoop();
  }

  stop() {
    this.state.recover.enabled = false;
    this.state.recover.configSwitched = false;
  }

  async activateRecoverLoop() {
    while (this.state.recover.enabled) {
      await this.update();
      await delay(1000);
    }
  }

  async update() {
    const playerShip = this.scene.getPlayerShip();
    if (!playerShip) return; // Ensure the player ship exists

    const currentMap = this.scene.currentMap;
    if (!mapConfigurations[currentMap]) {
      console.log(`No portals defined for map: ${currentMap}`);
      return;
    }

    if (this.scene.safeZone) {
      await this.recoverHealthUpdate();
      return;
    }

    const portals = mapConfigurations[currentMap];
    const closestPortal = this.findClosestPortal(playerShip, portals);

    if (!closestPortal) return;
    // Check if the ship is already at the portal using exact coordinates
    if (playerShip.x === closestPortal.x && playerShip.y === closestPortal.y) {
      await this.recoverHealthUpdate();
    } else {
      console.log(`Recovering - Moving to portal at (${closestPortal.x}, ${closestPortal.y})`);
      this.stats.messageState = "Recovering - Moving to closest portal";
      this.config.switchFleeMode();
      await this.navigation.move(closestPortal.x, closestPortal.y);
    }
  }

  async recoverHealthUpdate() {
    const playerShip = this.scene.getPlayerShip();
    if (!playerShip) return;

    const healthPercent = (playerShip.health / playerShip.maxHealth) * 100;
    const shieldPercent = playerShip.maxShield === 0 ? 100 : (playerShip.shield / playerShip.maxShield) * 100;

    const currentTime = Date.now();
    if (currentTime - this.lastHealthMessage >= 10000) {
      console.log(`${this.client.username} - Recovering health`, `${parseInt(healthPercent)}%`, `${parseInt(shieldPercent)}%`, this.state.recover.configSwitched, this.scene.safeZone);
      this.lastHealthMessage = currentTime;
    }

    this.stats.messageState = `Recovering - Health: ${parseInt(healthPercent)}% | Shield: ${parseInt(shieldPercent)}%`;
    if (healthPercent !== 100 || shieldPercent !== 100) return;

    if (this.state.recover.configSwitched) {
      console.log("Recovered full health, stopping", healthPercent, shieldPercent);
      this.stats.messageState = "Recovering - Full health reached, stopping";
      this.state.recover.fullHealth = true;
      this.stop();
      return;
    }

    this.state.recover.configSwitched = true;
    console.log("Switching config for health recovery");
    this.stats.messageState = "Recovering - Switching config for health recovery";
    await this.config.switchConfigPacket();
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
