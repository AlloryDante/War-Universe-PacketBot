global.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
global.dev = process.platform === "win32";

const Client = require("./general/netClient");
const User = require("./general/user");
const Scene = require("./general/scene");
const Controller = require("./general/controller");
const AdminScaners = require("./general/adminScaners");
const EventEmitter = require("events");
const Stats = require("./general/stats");

global.discordId = null;

class GameClient extends EventEmitter {
  constructor(config) {
    super();
    const { username, password, serverId, discordId } = config;
    global.discordId = discordId;

    this.client = new Client(username, password, serverId);
    this.client.start();

    this.user = new User(this.client);
    this.scene = new Scene(this.client);
    this.stats = new Stats(this.client, this.scene, this.user);
    this.controller = new Controller(this.client, this.scene, this.user, this.stats);
    this.adminScaners = new AdminScaners(this.client, username, serverId);

    this.status = "stopped";
    this.pendingStart = false;

    this.scene.once("mapLoaded", () => {
      if (this.pendingStart) {
        this.pendingStart = false;
        this._startBot();
      }
    });
  }

  async start() {
    console.log("Starting bot");
    this.validateSettings();

    if (!this.controller.mapLoaded) {
      console.log("Map not loaded yet. Bot will start automatically when map loads.");
      this.pendingStart = true;
      return true;
    }

    return this._startBot();
  }

  async _startBot() {
    await this.controller.startBot();
    if (this.controller.isRunning) {
      this.status = "running";
      this.stats.startTime = Date.now();
      this.emit("started");
      return true;
    }
    return false;
  }

  async stop() {
    this.pendingStart = false;
    this.controller.stopBot();
    this.status = "stopped";
    this.stats.startTime = null;
    this.emit("stopped");
  }

  validateSettings() {
    const settings = this.controller.SettingsManager;
    const mode = this.getActiveMode();

    if (!settings.botMap) {
      throw new Error("Work map not configured");
    }

    if ((mode === "kill" || mode === "killcollect") && (!settings.kill.targetNPC || settings.kill.targetNPC.length === 0)) {
      throw new Error("Error: Kill mode enabled but no NPCs configured");
    }

    if ((mode === "collect" || mode === "killcollect") && (!settings.collect.targetBoxes || settings.collect.targetBoxes.length === 0)) {
      throw new Error("Error: Collect mode enabled but no box types configured");
    }

    return true;
  }

  getActiveMode() {
    const ctrl = this.controller;
    if (ctrl.follow) return "follow";
    if (ctrl.kill) return "kill";
    if (ctrl.collect) return "collect";
    if (ctrl.killcollect) return "killcollect";
    return null;
  }

  setMode(mode) {
    this.controller.setMode(mode);
  }

  setSettings(settings) {
    const settingsManager = this.controller.SettingsManager;

    const { workMap, killTargets = [], collectBoxTypes = [], minHP = 0, adviceHP = 0, escape = {}, config = {}, antiban = {}, break: breakSettings = {}, enrichment = {}, kill = {}, admin = {} } = settings;

    if (workMap) {
      settingsManager.botMap = workMap;
    }

    settingsManager.kill.targetNPC = killTargets.map((target) => ({
      name: target.name,
      priority: target.priority || 1,
      ammo: target.ammo || 1,
      rockets: target.rockets || 1,
      farmNearPortal: target.farmNearPortal || false,
    }));

    settingsManager.collect.targetBoxes = collectBoxTypes.map((type) => {
      if (typeof type === "number") {
        return { type, priority: 1 };
      }
      return type;
    });

    settingsManager.detectors.health.minHP = minHP;
    settingsManager.detectors.health.adviceHP = adviceHP;
    if (config) {
      settingsManager.config = {
        ...settingsManager.config,
        ...config,
      };
    }
    if (escape) {
      settingsManager.escape = {
        ...settingsManager.escape,
        ...escape,
      };
    }
    if (kill) {
      settingsManager.kill = {
        ...settingsManager.kill,
        ...kill,
      };
    }

    if (admin) {
      settingsManager.admin = {
        ...settingsManager.admin,
        ...admin,
      };
    }

    if (antiban) {
      settingsManager.antiban = {
        ...settingsManager.antiban,
        ...antiban,
      };
    }

    if (enrichment) {
      settingsManager.enrichment = {
        ...settingsManager.enrichment,
        ...enrichment,
      };
    }

    if (settings.autobuy) {
      settingsManager.autobuy = {
        laser: {
          ...settingsManager.autobuy.laser,
          ...settings.autobuy.laser,
        },
        rockets: {
          ...settingsManager.autobuy.rockets,
          ...settings.autobuy.rockets,
        },
        key: {
          ...settingsManager.autobuy.key,
          ...settings.autobuy.key,
        },
      };
    }

    if (settings.break) {
      settingsManager.break = {
        ...settingsManager.break,
        ...breakSettings,
      };
    }
  }
}

module.exports = GameClient;
