const { calculateDistanceBetweenPoints } = require("../../utils/functions");

module.exports = class Health {
  constructor(client, scene, stateManager, settingsManager) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;
  }

  setMinHP(amount) {
    this.settings.detectors.health.minHP = amount;
  }
  setAdviceHP(amount) {
    this.settings.detectors.health.adviceHP = amount;
  }

  start() {
    if (this.state.detectors.health.enabled) return;
    if (this.settings.detectors.health.minHP === 0) return;
    this.state.detectors.health.enabled = true;
    this.activateWatchLoop();
  }

  stop() {
    this.state.detectors.health.enabled = false;
    this.resetState();
  }

  resetState() {
    this.state.detectors.health.lowHealthDetected = false;
    this.state.detectors.health.healthAdviced = false;
  }

  async activateWatchLoop() {
    while (this.state.detectors.health.enabled) {
      this.update();
      await delay(1000); // Check every 100ms
    }
  }

  async update() {
    const playerShip = this.scene.getPlayerShip();
    if (!playerShip) return; // Ensure the player ship exists

    const healthPercent = (playerShip.health / playerShip.maxHealth) * 100;
    const shieldPercent = playerShip.maxShield === 0 ? 100 : (playerShip.shield / playerShip.maxShield) * 100;

    if (shieldPercent <= 0) {
      this.state.detectors.health.shieldsDown = true;
    } else {
      this.state.detectors.health.shieldsDown = false;
    }

    if (this.settings.detectors.health.adviceHP && healthPercent < this.settings.detectors.health.adviceHP) {
      this.state.detectors.health.healthAdviced = true;
    } else {
      this.state.detectors.health.healthAdviced = false;
    }

    if (healthPercent < this.settings.detectors.health.minHP) {
      this.state.detectors.health.lowHealthDetected = true;
    } else if (healthPercent >= 100 && shieldPercent >= 100) {
      this.state.detectors.health.lowHealthDetected = false;
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
