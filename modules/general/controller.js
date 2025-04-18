const StateManager = require("../state/stateManager");
const SettingsManager = require("../state/settingsManager");
const Navigation = require("../modifiers/navigation");
const BoolManager = require("../state/boolManager");
const Follow = require("../controllers/follow");
const Kill = require("../controllers/kill");
const Collect = require("../controllers/collect");
const KillAndCollect = require("../controllers/killcollect");

const Recover = require("../behaviour/recover");
const Escape = require("../behaviour/escape");
const AdminEscape = require("../behaviour/adminEscape");
const Config = require("../behaviour/config");

const Health = require("../detectors/health");
const Enemy = require("../detectors/enemy");
const AutoBuy = require("../detectors/autobuy");
const Enrichment = require("../detectors/enritch");
const Break = require("../detectors/break");
const Admin = require("../detectors/admin");
module.exports = class Controller {
  constructor(client, scene, user, stats) {
    this.client = client;
    this.scene = scene;
    this.user = user;
    this.stats = stats;

    // Initialize managers
    this.StateManager = new StateManager(client, scene);
    this.SettingsManager = new SettingsManager(client, scene);
    this.BoolManager = new BoolManager(this.StateManager);
    this.Navigation = new Navigation(client, scene, this.StateManager);

    // Initialize behaviors
    this.Config = new Config(client, scene, this.StateManager, this.SettingsManager, this.stats);
    this.Recover = new Recover(client, scene, this.Navigation, this.Config, this.StateManager, this.stats);
    this.Escape = new Escape(client, scene, this.Navigation, this.Config, this.StateManager, this.SettingsManager, this.stats);
    this.AdminEscape = new AdminEscape(client, scene, this.Navigation, this.Config, this.StateManager, this.SettingsManager, this.stats);

    // Initialize detectors
    this.HealthDetector = new Health(client, scene, this.StateManager, this.SettingsManager);
    this.EnemyDetector = new Enemy(client, scene, this.StateManager, this.SettingsManager);
    this.AdminDetector = new Admin(client, scene, this.StateManager, this.SettingsManager);
    this.AutoBuyDetector = new AutoBuy(client, scene, this.StateManager, this.SettingsManager, this.user);
    this.EnrichmentDetector = new Enrichment(client, scene, this.StateManager, this.SettingsManager);
    this.BreakDetector = new Break(client, scene, this.StateManager, this.SettingsManager, this.Navigation, this.Recover, this.stats);

    // Initialize controllers

    this.KillManager = new Kill(client, scene, this.Navigation, this.Config, this.StateManager, this.SettingsManager, this.stats);
    this.CollectManager = new Collect(client, scene, this.Navigation, this.Config, this.StateManager, this.SettingsManager, this.user, this.stats);
    this.KillAndCollectManager = new KillAndCollect(client, scene, this.Navigation, this.KillManager, this.CollectManager, this.Config, this.StateManager, this.SettingsManager, this.stats);
    this.FollowManager = new Follow(client, scene, this.Navigation, this.KillManager, this.StateManager, this.Config);
    // State flags
    this.modulesEnabled = false;
    this.isRunning = false;
    this.mapLoaded = false;

    // Bot modes
    this.follow = true;
    this.kill = false;
    this.collect = false;
    this.killcollect = false;
    // Initialize map loading
    this.scene.once("mapLoaded", () => {
      this.mapLoaded = true;
      this.HealthDetector.start();
      this.EnemyDetector.start();
      this.AutoBuyDetector.start();
      this.EnrichmentDetector.start();
      this.BreakDetector.start();
      this.AdminDetector.start();
      console.log("Map loaded");
    });

    this.scene.setSettings(this.SettingsManager);
    this.lastPreventionLogTime = 0;
  }

  async startBot() {
    if (this.isRunning || !this.mapLoaded) {
      console.log("Cannot start bot: " + (!this.mapLoaded ? "Map not loaded" : "Already running"));
      return;
    }
    this.isRunning = true;
    console.log("Bot started");
    this.stats.messageState = "Bot started";
    this.update();
  }

  stopBot() {
    this.isRunning = false;
    this.stopAllModules();
    console.log("Bot stopped");
    this.stats.messageState = "Bot stopped";
  }

  async update() {
    await delay(3000);
    while (this.isRunning) {
      this.checkDeath();
      if (this.scene.playerShipExists()) {
        this.checkHealth();
        this.checkHealthAdviced();
        this.checkEnemy();
        this.checkMap();
        this.checkAdmin();
        this.checkState();
      }
      await delay(100);
    }
  }

  async checkDeath() {
    if (this.scene.isDead) {
      if (this.BoolManager.enabled("death")) return;
      console.log("Player died");
      this.stats.messageState = "Player died";
      this.stats.incrementDeaths();
      this.Recover.stop();
      this.Escape.stop();
      this.scene.sendRevive();
    } else {
      if (this.BoolManager.disabled("death")) return;
      console.log("Player respawned");
      this.StateManager.boolTriggers.enemy = false;
      this.StateManager.boolTriggers.lowhealth = true;
      this.StateManager.recover.enabled = true; //Preventing switch map
      this.stats.messageState = "Player respawned";
      await delay(5000);
      this.StateManager.recover.enabled = false;
      this.Recover.start();
    }
  }

  checkHealth() {
    if (!this.StateManager.detectors.health.enabled) return;
    const healthState = this.StateManager.detectors.health;
    if (healthState.lowHealthDetected) {
      if (this.BoolManager.enabled("lowhealth")) return;
      console.log("Low health detected, retreating");
      this.stats.messageState = "Low health detected, retreating";
      this.Recover.start();
    } else {
      if (this.StateManager.recover.enabled) return;
      if (this.BoolManager.disabled("lowhealth")) return;
      console.log("Restoring state - Full health reached");
      this.stats.messageState = "Restoring state - Full health reached (Report if persists)";
    }
  }

  checkHealthAdviced() {
    const healthState = this.StateManager.detectors.health;
    const isBusy = this.StateManager.kill.attacking || this.StateManager.collect.collecting || this.StateManager.navigation.inNavigation;

    if (healthState.healthAdviced) {
      if (!isBusy) {
        if (this.BoolManager.enabled("healthAdviced")) return;
        console.log("Advice health detected, retreating");
        this.stats.messageState = "Advice health detected, retreating";
        this.Recover.start();
      }
    } else {
      if (this.StateManager.recover.enabled) return;
      if (this.BoolManager.disabled("healthAdviced")) return;
      console.log("Advice health is restored");
      this.stats.messageState = "Advice health is restored";
    }
  }

  checkEnemy() {
    if (!this.StateManager.detectors.enemy.enabled) return;

    if (this.StateManager.detectors.enemy.enemyDetected) {
      if (this.BoolManager.enabled("enemy")) return;
      console.log("Enemy detected");
      this.stats.messageState = "Enemy detected escaping...";
      this.Recover.stop();
      this.Escape.start(() => {
        this.BoolManager.disabled("enemy");
      });
    }
  }

  checkAdmin() {
    if (!this.StateManager.detectors.admin.enabled) return;
    if (!this.SettingsManager.admin.enabled) return;

    if (this.StateManager.detectors.admin.adminDetected) {
      if (this.BoolManager.enabled("admin")) return;
      console.log("Admin detected");
      this.stats.messageState = "Admin detected escaping...";
      this.Recover.stop();
      this.AdminEscape.start(() => {
        this.BoolManager.disabled("admin");
      });
    }
  }

  checkMap() {
    if (this.scene.currentMap !== this.SettingsManager.botMap) {
      if (this.scene.isDead || this.StateManager.boolTriggers.enemy || this.StateManager.boolTriggers.lowhealth) return;
      if (this.BoolManager.enabled("wrongmap")) return;
      this.Navigation.goToMap(this.SettingsManager.botMap);
      console.log(`${this.client.username} - Wrong map detected ${this.scene.currentMap} -> ${this.SettingsManager.botMap}`);
      this.stats.messageState = "Wrong map detected, navigating to correct map";
    } else {
      if (this.BoolManager.disabled("wrongmap")) return;
      console.log("Correct map detected");
      this.stats.messageState = "Correct map detected";
    }
  }

  checkState() {
    const preventingConditions = [];
    const others = [];
    if (this.scene.isDead) preventingConditions.push("isDead");
    if (this.StateManager.boolTriggers.enemy) preventingConditions.push("enemy");
    if (this.StateManager.boolTriggers.admin) preventingConditions.push("admin");
    if (this.StateManager.boolTriggers.lowhealth) preventingConditions.push("lowhealth");
    if (this.StateManager.boolTriggers.break) preventingConditions.push("break");
    if (this.scene.currentMap !== this.SettingsManager.botMap) preventingConditions.push("wrongMap");
    if (this.StateManager.recover.enabled) preventingConditions.push("recover");
    if (this.StateManager.detectors.health.healthAdviced) others.push("healthAdviced");

    if (preventingConditions.length > 0) {
      const currentTime = Date.now();
      if (currentTime - this.lastPreventionLogTime >= 10000) {
        console.log(`${this.client.username} - start prevented by:`, preventingConditions.join(", "), "others:", others.join(", "));
        this.lastPreventionLogTime = currentTime;
      }
      this.stopAllModules();
    } else {
      this.restartAllModules();
    }
  }

  stopAllModules() {
    if (!this.modulesEnabled) return;
    console.log("Stopping all modules");
    this.modulesEnabled = false;
    this.FollowManager.stop();
    this.KillManager.stop();
    this.CollectManager.stop();
    this.KillAndCollectManager.stop();
  }

  restartAllModules() {
    if (this.modulesEnabled) return;
    console.log("Starting all modules");
    this.modulesEnabled = true;

    if (this.follow) {
      this.FollowManager.start();
    }
    if (this.kill) {
      this.KillManager.start();
    }
    if (this.collect) {
      this.CollectManager.setBoxType(this.SettingsManager.collect.targetBoxes);
      this.CollectManager.start();
    }
    if (this.killcollect) {
      this.KillAndCollectManager.setBoxType(this.SettingsManager.collect.targetBoxes);
      this.KillAndCollectManager.start();
    }
  }

  followMaster(masterID) {
    if (!masterID) throw new Error("No masterid set");
    this.follow = true;
    this.FollowManager.setMasterID(masterID);
    this.FollowManager.start();
  }

  stopFollow() {
    this.follow = false;
    this.FollowManager.stop();
  }

  setMode(mode) {
    // Reset all modes
    this.follow = false;
    this.kill = false;
    this.collect = false;
    this.killcollect = false;

    // Stop all current activities
    this.stopAllModules();

    // Set the selected mode
    switch (mode.toLowerCase()) {
      case "follow":
        this.follow = true;
        break;
      case "kill":
        this.kill = true;
        break;
      case "collect":
        this.collect = true;
        break;
      case "killcollect":
        this.killcollect = true;
        break;
      default:
        throw new Error("Invalid mode. Use: follow, kill, collect, or killcollect");
    }

    console.log(`Bot mode set to: ${mode}`);

    // Restart modules if bot is running
    if (this.isRunning) {
      this.restartAllModules();
    }
  }
};
