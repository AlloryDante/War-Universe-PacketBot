module.exports = class Enrichment {
  constructor(client, scene, stateManager, settingsManager) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;

    this.resources = {
      cerium: { amount: 0, type: 0 },
      mercury: { amount: 0, type: 1 },
      erbium: { amount: 0, type: 2 },
      piritid: { amount: 0, type: 3 },
      darkonit: { amount: 0, type: 4 },
      uranit: { amount: 0, type: 5 },
      azurit: { amount: 0, type: 6 },
      dungid: { amount: 0, type: 7 },
      xureon: { amount: 0, type: 8 },
    };

    this.client.on("kryo_packet", (type, payload) => {
      if (type == "ResourcesInfoResponsePacket") {
        this.updateResources(payload);
      }
    });
  }

  start() {
    if (this.state.enrichment?.enabled) return;
    this.state.enrichment = { enabled: true };
    this.activateCheckLoop();
  }

  stop() {
    if (this.state.enrichment) {
      this.state.enrichment.enabled = false;
    }
  }

  async activateCheckLoop() {
    while (true) {
      this.client.sendPacket("ResourcesActionRequestPacket", {});
      await delay(1000);
      this.attemptUpgrade();
      await delay(10 * 60 * 1000 - 2000); // Check every 10 minutes
    }
  }

  updateResources(payload) {
    const resourceNames = ["cerium", "mercury", "erbium", "piritid", "darkonit", "uranit", "azurit", "dungid", "xureon"];

    payload.resources.forEach((resource, index) => {
      const name = resourceNames[index];
      if (name) {
        this.resources[name].amount = resource.amount;
      }
    });
  }

  attemptUpgrade() {
    const modules = ["lasers", "rockets", "shields", "speed"];
    const moduleIndices = { lasers: 0, rockets: 1, shields: 2, speed: 3 };

    // First handle shields and speed normally
    ["shields", "speed"].forEach((module) => {
      const config = this.settings.enrichment[module];
      if (config.enabled) {
        const resourceName = Object.keys(this.resources).find((name) => this.resources[name].type === config.materialType);
        if (resourceName && this.resources[resourceName].amount >= config.minAmount) {
          this.upgrade(moduleIndices[module], config.materialType, config.amount);
        } else if (resourceName && this.resources[resourceName].amount > 0) {
          this.upgrade(moduleIndices[module], config.materialType, this.resources[resourceName].amount);
        }
      }
    });

    // Special handling for lasers and rockets
    const lasersConfig = this.settings.enrichment.lasers;
    const rocketsConfig = this.settings.enrichment.rockets;

    if (lasersConfig.enabled && rocketsConfig.enabled && lasersConfig.materialType === rocketsConfig.materialType) {
      const resourceName = Object.keys(this.resources).find((name) => this.resources[name].type === lasersConfig.materialType);
      const availableAmount = this.resources[resourceName].amount;
      const halfAmount = parseInt(Math.floor(availableAmount / 2));
      if (halfAmount > 0) {
        this.upgrade(moduleIndices.lasers, lasersConfig.materialType, halfAmount);
        this.upgrade(moduleIndices.rockets, rocketsConfig.materialType, halfAmount);
      }
    } else {
      // If only one is enabled or they use different materials, use full amount

      if (lasersConfig.enabled) {
        const resourceName = Object.keys(this.resources).find((name) => this.resources[name].type === lasersConfig.materialType);
        this.upgrade(moduleIndices.lasers, lasersConfig.materialType, this.resources[resourceName].amount);
      }
      if (rocketsConfig.enabled) {
        const resourceName = Object.keys(this.resources).find((name) => this.resources[name].type === rocketsConfig.materialType);
        this.upgrade(moduleIndices.rockets, rocketsConfig.materialType, this.resources[resourceName].amount);
      }
    }
  }

  upgrade(module, materialType, amount) {
    if (amount == 0) return;
    if (materialType == 0) return;

    console.log(`${this.client.username} - Upgrading ${module} with ${materialType} ${amount}`);
    this.client.sendPacket("ResourcesActionRequestPacket", { actionId: 2, data: [module, materialType, amount] });
  } //data: [(0 is lasers, 1 is rockets, 2 is shields, 3 is speed), 4 - material type, 1 - amount] = upgrade module
};
