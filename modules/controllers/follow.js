const { calculateDistanceBetweenPoints } = require("../../utils/functions");

module.exports = class Follow {
  constructor(client, scene, navigation, kill, stateManager, config) {
    this.enabled = false;
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.kill = kill;
    this.state = stateManager;
    this.masterID = 758807; // YOU CAN SET A PLAYER ID AND BOT WILL FOLLOW AND PROBABLY IT WILL ALSO ATTACK WHAT YOU'RE SHOOTING
    this.config = config;
  }
  setMasterID(masterID) {
    this.masterID = masterID;
  }
  start() {
    if (this.enabled) return;
    if (!this.masterID) throw new Error("Master ID is not set!");
    this.state.kill.enabled = true;
    this.enabled = true;
    this.followMaster();
  }
  stop() {
    this.enabled = false;
  }
  getMasterCoords() {
    const masterShip = this.scene.ships[this.masterID];
    if (masterShip) {
      return [masterShip.x, masterShip.y];
    } else {
      return [0, 0];
    }
  }

  async followMaster() {
    const threshold = 500;
    const catchupThreshold = 1000;
    let collecting = false;
    let targetColectible = null;

    while (this.enabled) {
      await delay(400);
      const masterCoords = this.getMasterCoords();
      const masterX = masterCoords[0];
      const masterY = masterCoords[1];

      // Get master's target
      const masterShip = this.scene.ships[this.masterID];
      if (masterShip?.selected && masterShip.isAttacking) {
        console.log("Master is attacking, killing target", masterShip.selected);
        await this.kill.kill(masterShip.selected);
      } else {
        // Regular following logic
        this.config.switchFlyMode();

        if (masterX != 0 && masterY != 0) {
          const distance = calculateDistanceBetweenPoints(this.scene.x, this.scene.y, masterX, masterY);

          if (distance == 0 || distance > catchupThreshold) {
            if (this.masterX && this.masterY) {
              console.log("Moving straight to master");
              this.navigation.move(this.masterX, this.masterY);
            }
          } else if (distance > threshold) {
            // If within range but still needs to follow, apply small random deviation
            const deviationX = Math.floor((Math.random() - 0.5) * 500);
            const deviationY = Math.floor((Math.random() - 0.5) * 500);

            // New target coordinates
            const newX = Math.floor(masterX + deviationX);
            const newY = Math.floor(masterY + deviationY);

            // Move using integer coordinates
            this.navigation.move(newX, newY);
          }
        }
      }
    }
  }
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
