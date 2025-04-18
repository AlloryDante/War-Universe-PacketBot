module.exports = class stateManager {
  constructor(client, scene) {
    this.enabled = false;
    this.client = client;
    this.scene = scene;

    this.config = {
      enabled: false,
      config: null,
      mode: null,
    };
    this.recover = {
      enabled: false,
      configSwitched: false,
      fullHealth: false,
    };

    this.escape = {
      enabled: false,
      waitedTime: 0,
      enemyLeft: false,
    };

    this.admin = {
      enabled: false,
      waitedTime: 0,
      adminLeft: false,
    };

    this.detectors = {
      health: {
        enabled: false,
        lowHealthDetected: false,
        healthAdviced: false,
        shieldsDown: false,
      },
      enemy: {
        enabled: false,
        enemyDetected: false,
      },
      admin: {
        enabled: false,
        adminDetected: false,
      },
      break: {
        enabled: false,
        breakDetected: false,
        breakAdviced: false,
        lastBreakTime: Date.now(),
      },
    };
    this.boolTriggers = {
      lowhealth: false,
      healthAdviced: false,
      admin: false,
      death: false,
      enemy: false,
    };

    this.navigation = {
      inNavigation: false,
      following: false,
    };

    this.kill = {
      enabled: false,
      killInProgress: false,
      targetedID: null,
      selected: false,
      attacking: false,
      antibanMoving: false,
      lastMoveTimestamp: 0,
      currentAmmo: null,
      currentRocket: null,
    };

    this.collect = {
      enabled: false,
      collecting: false,
      targetBox: null,
    };

    this.enrichment = {
      enabled: false,
    };

    this.killAndCollect = {
      enabled: false,
    };
  }
};
