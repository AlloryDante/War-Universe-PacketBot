module.exports = class settingsManager {
  constructor(client, scene) {
    this.enabled = false;
    this.client = client;
    this.scene = scene;

    this.botMap = null;

    this.config = {
      attacking: 1,
      fleeing: 1,
      flying: 1,
    };

    this.escape = {
      enabled: true,
      delay: 15000,
    };

    this.detectors = {
      health: {
        minHP: 0,
        adviceHP: 0,
      },
    };
    this.admin = {
      enabled: false,
      delay: 5 * 60 * 1000,
    };

    this.kill = {
      targetNPC: [],
      targetEngagedNPC: false,
    };

    this.collect = {
      targetBoxes: [],
    };

    this.autobuy = {
      laser: {
        RLX_1: false,
        GLX_2: false,
        BLX_3: false,
        GLX_2_AS: false,
        MRS_6X: false,
      },
      rockets: {
        KEP_410: false,
        NC_30: false,
        TNC_130: false,
      },
      key: {
        enabled: false,
        savePLT: 50000,
      },
    };

    this.break = {
      enabled: false,
      interval: 3600000,
      duration: 300000,
    };

    this.enrichment = {
      lasers: { enabled: false, materialType: 0 },
      rockets: { enabled: false, materialType: 0 },
      shields: { enabled: false, materialType: 0, amount: 10, minAmount: 10 },
      speed: { enabled: false, materialType: 0, amount: 10, minAmount: 10 },
    };
  }
};
