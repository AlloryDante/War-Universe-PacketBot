const { calculateDistanceBetweenPoints } = require("../../utils/functions");

module.exports = class Enemy {
  constructor(client, scene, stateManager, settingsManager) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;

    this.state.detectors.enemy.enemyDetected = false;
    this.companyID = 0;
  }

  start() {
    if (!this.settings.escape.enabled) return;
    if (this.state.detectors.enemy.enabled) return;
    this.state.detectors.enemy.enabled = true;
    this.activateWatchLoop();
  }

  stop() {
    this.state.detectors.enemy.enabled = false;
    this.resetState();
  }

  resetState() {
    this.companyID = 0;
    this.state.detectors.enemy.enemyDetected = false;
  }

  async activateWatchLoop() {
    while (this.state.detectors.enemy.enabled) {
      this.update();
      await delay(100); // Check every 100ms
    }
  }

  async update() {
    if (!this.companyID) {
      const playerShip = this.scene.getPlayerShip();
      if (!playerShip) return; // Ensure the player ship exists
      this.companyID = playerShip.corporation;
    } else {
      // Check for enemy ships
      const enemyShips = Object.values(this.scene.ships).filter((ship) => ship.corporation && ship.corporation !== this.companyID && ship.id != this.scene.getPlayerShip().id);

      if (enemyShips.length > 0) {
        this.state.detectors.enemy.enemyDetected = true;
      } else {
        this.state.detectors.enemy.enemyDetected = false;
      }
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
