module.exports = class Break {
  constructor(client, scene, stateManager, settingsManager, navigation, recover, stats) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;
    this.navigation = navigation;
    this.recover = recover;
    this.stats = stats;
  }

  start() {
    if (!this.settings.break.interval || !this.settings.break.duration) {
      console.log("Break module is not enabled");
      return;
    }
    if (this.state.detectors.break.enabled) return;
    this.state.detectors.break.enabled = true;
    this.checkBreakLoop();
  }

  stop() {
    this.state.detectors.break.enabled = false;
    this.state.detectors.break.breakAdviced = false;
  }

  async checkBreakLoop() {
    while (this.state.detectors.break.enabled) {
      await this.update();
      await delay(1000);
    }
  }

  isShipBusy() {
    // Check if ship is in combat
    if (this.state.kill.attacking || this.state.kill.killInProgress) {
      console.log("Break - Ship is busy, killing in progress", this.state.kill.attacking, this.state.kill.killInProgress);
      return true;
    }

    // Check if other safety modules are active
    if (this.state.recover.enabled || this.state.escape.enabled) {
      console.log("Break - Ship is busy, recovering or escaping in progress", this.state.recover.enabled, this.state.escape.enabled);
      return true;
    }

    // Check if ship is collecting
    if (this.state.collect.collecting) {
      console.log("Break - Ship is busy, collecting in progress");
      return true;
    }

    return false;
  }

  async update() {
    const now = Date.now();
    const timeSinceLastBreak = now - this.state.detectors.break.lastBreakTime;

    if (timeSinceLastBreak >= this.settings.break.interval * 60 * 1000) {
      if (!this.state.detectors.break.breakDetected) {
        // Check if ship is busy before starting break
        this.state.detectors.break.breakAdviced = true;
        if (this.isShipBusy()) {
          return;
        }

        console.log("Break time started");
        this.stats.messageState = "Break time started";
        this.state.detectors.break.breakDetected = true;
        this.state.boolTriggers.break = true;

        // Use recover module to go to safe zone
        this.recover.start();

        // Wait for break duration while updating message every second
        const endTime = Date.now() + this.settings.break.duration * 60 * 1000;
        while (Date.now() < endTime) {
          const remainingMinutes = Math.ceil((endTime - Date.now()) / (60 * 1000));
          this.stats.messageState = `Break time remaining: ${remainingMinutes} minutes`;
          await delay(1000);
        }

        // Reset break state
        console.log("Break time finished");
        this.stats.messageState = "Break time finished";
        this.state.detectors.break.lastBreakTime = now;
        this.state.detectors.break.breakDetected = false;
        this.state.boolTriggers.break = false;
        this.state.detectors.break.breakAdviced = false;
        this.recover.stop();
      }
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
