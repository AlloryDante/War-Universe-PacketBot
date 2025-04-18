const { calculateDistanceBetweenPoints } = require("../../utils/functions");

module.exports = class Collect {
  constructor(client, scene, navigation, config, stateManager, settingsManager, user, stats) {
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.config = config;
    this.state = stateManager;
    this.settings = settingsManager;
    this.user = user;
    this.stats = stats;
    this.settings.collect.targetBoxes = [];

    this.state.collect.targetBox = null;
    this.state.collect.collecting = false;
  }
  setBoxType(names) {
    this.settings.collect.targetBoxes = names;
  }
  start() {
    if (this.state.collect.enabled) return;
    if (!this.settings.collect.targetBoxes.length === 0) throw new Error("BOX list is not set!");
    this.state.collect.enabled = true;
    this.activateCollectLoop();
  }
  stop() {
    this.state.collect.enabled = false;
    this.resetState();
  }

  async activateCollectLoop() {
    while (this.state.collect.enabled) {
      await this.update();
      await delay(20);
    }
  }

  async update() {
    if (!this.state.collect.targetBox) {
      if (this.state.detectors.break.breakAdviced) return;
      if (this.state.detectors.health.healthAdviced) return;
      this.state.collect.targetBox = await this.findBoxWhileMoving();
    }

    if (!this.state.collect.collecting && this.state.collect.targetBox) {
      this.config.switchFlyMode();
      await this.collectWait(this.state.collect.targetBox);
    }
  }

  async collectWait(box) {
    this.state.collect.collecting = true;

    this.navigation.move(box.x, box.y + 95);
    //target
    while (this.scene.isMoving && this.state.collect.enabled) {
      await delay(200);
    }
    if (!this.state.collect.enabled) return;

    this.scene.sendCollect(box.id);

    if (box.type === 0) {
      this.stats.incrementCargoBoxes();
      this.stats.messageState = "Collecting - Cargo box collected";
    }
    if (box.type === 1) {
      this.stats.incrementResourceBoxes();
      this.stats.messageState = "Collecting - Resource box collected";
    }
    if (box.type === 3) {
      await delay(6000);
      this.stats.incrementGreenBoxes();
      this.stats.messageState = "Collecting - Green box collected";
    }
    this.resetState();
  }

  async findBoxWhileMoving() {
    while (this.state.collect.enabled) {
      const closestCollectible = await this.findBox();

      if (closestCollectible) {
        return closestCollectible;
      }

      if (!this.scene.isMoving) {
        this.stats.messageState = "Collecting - Roaming";
        this.scene.isMoving = true;
        this.navigation.moveToRandomPoint();
      }
      await delay(20);
    }
  }

  async findBox() {
    const closestCollectible = findClosestCollectible(this.scene.x, this.scene.y, this.scene.collectibles, this.settings.collect.targetBoxes, this.user?.bootyKeys || 0, this.scene);
    if (closestCollectible) return closestCollectible;
    return null;
  }

  resetState() {
    this.state.collect.targetBox = null;
    this.state.collect.collecting = false;
  }
};

function findClosestCollectible(x, y, collectibles, types, bootyKeys, scene) {
  if (collectibles.length === 0) return null;

  let bestCollectible = null;
  let bestScore = -Infinity;

  const playerShip = scene.getPlayerShip();
  const isCargoFull = playerShip?.cargo >= playerShip?.maxCargo - 5;
  for (const collectible of collectibles) {
    if (!collectible.existOnMap) continue;
    if (!collectible.priority) continue; // Skip if not in target list

    // Skip booty boxes if no keys
    if (collectible.type === 3 && bootyKeys <= 0) continue;

    // Skip cargo boxes if cargo is full
    if (collectible.type === 1 && isCargoFull) continue;

    const distance = Math.sqrt(Math.pow(collectible.x - x, 2) + Math.pow(collectible.y - y, 2));
    const distanceScore = 1 - Math.min(distance / 2000, 1);

    const score = collectible.priority * 1000 + distanceScore * 100;

    if (score > bestScore) {
      bestScore = score;
      bestCollectible = collectible;
      bestCollectible.distance = distance;
    }
  }

  return bestCollectible;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
