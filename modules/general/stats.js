module.exports = class Stats {
  constructor(client, scene, user) {
    this.client = client;
    this.scene = scene;
    this.user = user;

    // Combat stats
    this.kills = 0;
    this.deaths = 0;
    this.config = 0;

    this.messageState = "";

    // Collection stats
    this.cargoBoxesCollected = 0;
    this.resourceBoxesCollected = 0;
    this.greenBoxesCollected = 0;

    // Resource tracking
    this.startCredits = 0;
    this.startPlt = 0;
    this.startHnr = 0;
    this.startExp = 0;

    this.startTime = Date.now();

    // Initialize starting resources once user data is loaded
    this.initializeResources();
  }

  async initializeResources() {
    // Wait for user data to be loaded
    while (!this.user.loaded) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.startCredits = this.user.credits;
    this.startPlt = this.user.plt;
    this.startHnr = this.user.honor;
    this.startExp = this.user.experience;
  }

  incrementKills() {
    this.kills++;
  }

  incrementDeaths() {
    this.deaths++;
  }
  changeConfig(config) {
    this.config = config;
  }

  incrementCargoBoxes() {
    this.cargoBoxesCollected++;
  }
  incrementResourceBoxes() {
    this.resourceBoxesCollected++;
  }
  incrementGreenBoxes() {
    this.greenBoxesCollected++;
  }

  getKDRatio() {
    return this.deaths === 0 ? this.kills : (this.kills / this.deaths).toFixed(2);
  }

  getCreditsPerHour() {
    const hoursSinceStart = (Date.now() - this.startTime) / (1000 * 60 * 60);
    const creditsDifference = this.user.credits - this.startCredits;
    return hoursSinceStart === 0 ? 0 : Math.round(creditsDifference / hoursSinceStart);
  }

  getPltPerHour() {
    const hoursSinceStart = (Date.now() - this.startTime) / (1000 * 60 * 60);
    const pltDifference = this.user.plt - this.startPlt;
    return hoursSinceStart === 0 ? 0 : Math.round(pltDifference / hoursSinceStart);
  }

  getHnrPerHour() {
    const hoursSinceStart = (Date.now() - this.startTime) / (1000 * 60 * 60);
    const hnrDifference = this.user.honor - this.startHnr;
    return hoursSinceStart === 0 ? 0 : Math.round(hnrDifference / hoursSinceStart);
  }

  getExpPerHour() {
    const hoursSinceStart = (Date.now() - this.startTime) / (1000 * 60 * 60);
    const expDifference = this.user.experience - this.startExp;
    return hoursSinceStart === 0 ? 0 : Math.round(expDifference / hoursSinceStart);
  }

  getCargoCapacity() {
    const playerShip = this.scene.getPlayerShip();
    const capacity = (playerShip?.cargo / playerShip?.maxCargo) * 100;
    return parseInt(capacity);
  }

  getStats() {
    const playerShip = this.scene.getPlayerShip();
    let healthPercent = 0;
    let shieldPercent = 0;
    if (playerShip) {
      healthPercent = parseInt((playerShip.health / playerShip.maxHealth) * 100);
      shieldPercent = parseInt((playerShip.shield / playerShip.maxShield) * 100);
    }

    return {
      messageState: this.messageState,
      kills: this.kills,
      deaths: this.deaths,
      kdRatio: this.getKDRatio(),
      creditsPerHour: this.getCreditsPerHour(),
      pltPerHour: this.getPltPerHour(),
      hnrPerHour: this.getHnrPerHour(),
      expPerHour: this.getExpPerHour(),
      cargoBoxesCollected: this.cargoBoxesCollected,
      resourceBoxesCollected: this.resourceBoxesCollected,
      greenBoxesCollected: this.greenBoxesCollected,
      cargoCapacity: this.getCargoCapacity(),
      health: healthPercent,
      shield: shieldPercent,
      config: this.config,
      runTime: this.getRunTime(),
      credits: this.user.credits,
      plt: this.user.plt,
      map: this.scene.currentMap,
      position: { x: parseInt(this.scene.x / 100), y: parseInt(this.scene.y / 100) },
      level: this.user.level,
      xp: this.user.experience,
    };
  }

  getRunTime() {
    const milliseconds = Date.now() - this.startTime;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
};
