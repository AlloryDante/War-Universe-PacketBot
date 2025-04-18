const { calculateDistanceBetweenPoints } = require("../../utils/functions");
const mapConfigurations = require("../../utils/mapRegions");

module.exports = class Config {
  constructor(client, scene, stateManager, settingsManager, stats) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;
    this.stats = stats;

    this.state.config.enabled = false;
    this.state.config.config = null;
    this.state.config.mode = "attacking";

    this.advisedConfig = null; //overwriting config in case of instant change
    this.configChangeInProgress = false;
    this.lastConfigChange = 0;

    this.init();
  }

  init() {
    this.client.on("kryo_packet", (type, payload) => {
      if (type == "GameStateResponsePacket") {
        this.state.config.config = payload.confi;
      }
    });
    this.activateConfigLoop();
  }

  async activateConfigLoop() {
    if (this.state.config.enabled) return;
    this.state.config.enabled = true;
    while (this.state.config.enabled) {
      await this.update();
      await delay(1000);
    }
  }
  async update() {
    if (!this.settings.config.switchConfigOnShieldsDown) return;
    if (this.state.kill.attacking && this.state.detectors.health.shieldsDown) {
      if (this.state.config.mode == "attacking") {
        const config = this.settings.config.attacking == 1 ? 2 : 1;
        console.log("Shields down, changing config");
        this.state.config.mode = "attackingChange";
        await this.switchConfig(config);
      } else if (this.state.config.mode == "attackingChange") {
        console.log("Shields down on secondary config, switching to primary");
        this.state.config.mode = "attackingFinal";
        await this.switchConfig(this.settings.config.attacking);
      }
    }
  }

  async switchAttackMode() {
    if (this.state.config.mode === "attacking" || this.state.config.mode === "attackingChange" || this.state.config.mode === "attackingFinal") return;
    this.state.config.mode = "attacking";
    console.log("Switching to attacking mode");
    await this.switchConfig(this.settings.config.attacking);
  }
  async switchFleeMode() {
    if (this.state.config.mode === "fleeing") return;
    this.state.config.mode = "fleeing";
    console.log("Switching to fleeing mode");
    await this.switchConfig(this.settings.config.fleeing);
  }
  async switchFlyMode() {
    if (this.state.config.mode === "flying") return;
    this.state.config.mode = "flying";
    console.log("Switching to flying mode");
    await this.switchConfig(this.settings.config.flying);
  }

  async switchConfig(config) {
    this.advisedConfig = config;
    if (this.advisedConfig == this.state.config.config) return;
    if (this.configChangeInProgress) return;
    this.configChangeInProgress = true;

    if (Date.now() - this.lastConfigChange < 5000) {
      await delay(5100 - (Date.now() - this.lastConfigChange));
    }

    this.switchConfigPacket();
    let waitResultCount = 0;

    while (this.advisedConfig !== this.state.config.config) {
      await delay(100);
      waitResultCount++;
      if (waitResultCount > 100) {
        this.switchConfigPacket();
        waitResultCount = 0;
      }
    }
    console.log("Config switched to", this.state.config.config);
    this.stats.changeConfig(this.state.config.config);
    this.configChangeInProgress = false;
  }

  switchConfigPacket() {
    this.lastConfigChange = Date.now();
    this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 5 }] });
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
