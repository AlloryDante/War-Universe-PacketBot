const { calculateDistanceBetweenPoints } = require("../../utils/functions");

module.exports = class KillCollect {
  constructor(client, scene, navigation, killModule, collectModule, config, stateManager, settingsManager) {
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.killModule = killModule;
    this.collectModule = collectModule;
    this.config = config;
    this.state = stateManager;
    this.settings = settingsManager;

    this.state.killAndCollect.enabled = false;
  }

  setBoxType(names) {
    this.collectModule.setBoxType(names);
  }

  start() {
    if (this.state.killAndCollect.enabled) return;
    if (this.settings.collect.targetBoxes.length === 0) {
      throw new Error("BOX list is not set!");
    }
    if (this.settings.kill.targetNPC.length === 0) {
      throw new Error("NPC list is not set!");
    }
    this.state.killAndCollect.enabled = true;
    this.state.kill.enabled = true;
    this.state.collect.enabled = true;
    this.activateKillAndCollectLoop();
  }
  stop() {
    this.state.killAndCollect.enabled = false;
    this.killModule.stop();
    this.collectModule.stop();
  }

  async activateKillAndCollectLoop() {
    while (this.state.killAndCollect.enabled) {
      this.update();
      this.killModule.antibanMove();
      await delay(20);
    }
  }

  async update() {
    if (this.state.kill.killInProgress) {
      if (this.state.kill.attacking && !this.state.collect.collecting && !this.scene.isMoving) {
        const closestBox = await this.collectModule.findBox();
        const currentTarget = this.scene.ships[this.state.kill.targetedID];
        const targetConfig = this.settings.kill.targetNPC.find((t) => t.name === currentTarget?.name);

        if (closestBox?.distance < 800 || closestBox?.type === 3) {
          if (dev) console.log("High priority box detected, collecting first");
          await this.collectModule.collectWait(closestBox);
        }
      }
    } else {
      if (this.state.collect.collecting) return;
      if (this.state.detectors.break.breakAdviced) return;
      if (this.state.detectors.health.healthAdviced) return;

      const closestBox = await this.collectModule.findBox();
      const enemy = await this.killModule.findEnemy();

      if (closestBox && enemy) {
        const targetConfig = this.settings.kill.targetNPC.find((t) => t.name === this.scene.ships[enemy]?.name);
        if (closestBox.priority > (targetConfig?.priority || 0)) {
          await this.collectModule.collectWait(closestBox);
          return;
        }
      }

      if (enemy) {
        this.killModule.kill(enemy);
        return;
      }

      if (closestBox) {
        await this.collectModule.collectWait(closestBox);
        return;
      }

      if (!this.scene.isMoving) {
        this.config.switchFlyMode();
        this.navigation.moveToRandomPoint();
      }
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
