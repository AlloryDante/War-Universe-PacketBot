module.exports = class AutoBuy {
  constructor(client, scene, stateManager, settingsManager, user) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;
    this.settings = settingsManager;
    this.user = user;

    this.laserConfigs = {
      RLX_1: { amount: 10000, minAmount: 1000 },
      GLX_2: { amount: 10000, minAmount: 1000 },
      BLX_3: { amount: 10000, minAmount: 1000 },
      GLX_2_AS: { amount: 10000, minAmount: 1000 },
      MRS_6X: { amount: 1000, minAmount: 1000 },
    };

    this.rocketConfigs = {
      KEP_410: { amount: 1000, minAmount: 100 },
      NC_30: { amount: 1000, minAmount: 100 },
      TNC_130: { amount: 1000, minAmount: 100 },
    };

    this.keyConfig = {
      amount: 1,
      minAmount: 1,
    };

    this.buyInProgress = false;
    this.items = null;
    this.requestId = 1;

    this.client.on("kryo_packet", (type, payload) => {
      if (type == "ApiResponsePacket" && payload.uri == "shop/items/v2") {
        this.items = JSON.parse(payload?.responseDataJson)?.itemsDataList;
        this.updateItemConfigs();
      }
    });
  }

  updateItemConfigs() {
    if (!this.items) return;

    for (const [type, config] of Object.entries(this.laserConfigs)) {
      const item = this.items.find((i) => i.title === type.replaceAll("_", "-"));

      if (item) {
        config.itemId = item.itemId;
        config.price = parseInt((config.amount / item.quantity) * item.price);
        config.currency = item.currencyKindId === "currency_2" ? "plt" : "credits";
      }
    }

    for (const [type, config] of Object.entries(this.rocketConfigs)) {
      const item = this.items.find((i) => i.title === type.replaceAll("_", "-"));
      if (item) {
        config.itemId = item.itemId;
        config.price = parseInt((config.amount / item.quantity) * item.price);
        config.currency = item.currencyKindId === "currency_2" ? "plt" : "credits";
      }
    }

    const keyItem = this.items.find((i) => i.itemKindId === "key_1");
    if (keyItem) {
      this.keyConfig.itemId = keyItem.itemId;
      this.keyConfig.price = parseInt(this.keyConfig.amount * keyItem.price);
      this.keyConfig.currency = keyItem.currencyKindId === "currency_2" ? "plt" : "credits";
    }
  }

  start() {
    if (this.state.autobuy?.enabled) return;
    this.state.autobuy = { enabled: true };
    this.activateCheckLoop();
  }

  stop() {
    if (this.state.autobuy) {
      this.state.autobuy.enabled = false;
    }
  }

  async activateCheckLoop() {
    while (this.state.autobuy?.enabled) {
      await this.checkResources();

      await delay(5000); // Check every 5 seconds
    }
  }

  async checkResources() {
    if (this.buyInProgress || !this.user.loaded) return;
    if (!this.items) {
      this.client.sendPacket("ApiRequestPacket", {
        requestId: 50,
        uri: "shop/items/v2",
        requestDataJson: {},
      });
      this.requestId++;
      return;
    }

    this.buyInProgress = true;

    try {
      // Check lasers
      for (const [type, enabled] of Object.entries(this.settings.autobuy.laser)) {
        if (enabled && this.laserConfigs[type]) {
          const config = this.laserConfigs[type];

          if (this.user.lasers[type] < config.minAmount) {
            // Check if user has enough currency
            if (config.currency === "plt" && this.user.plt >= config.price) {
              console.log(`Buying ${config.amount} ${type} for ${config.price} PLT`);
              await this.buyItem(config.itemId, config.amount, config.price);
              await delay(1000);
            } else if (config.currency === "credits" && this.user.credits >= config.price) {
              console.log(`Buying ${config.amount} ${type} for ${config.price} Credits`);
              await this.buyItem(config.itemId, config.amount, config.price);
              await delay(1000);
            } else {
              console.log(`Insufficient ${config.currency} for lasers ${type}. Need ${config.price}, have ${config.currency === "plt" ? this.user.plt : this.user.credits}`);
            }
          }
        }
      }

      // Check rockets
      for (const [type, enabled] of Object.entries(this.settings.autobuy.rockets)) {
        if (enabled && this.rocketConfigs[type]) {
          const config = this.rocketConfigs[type];

          if (this.user.rockets[type] < config.minAmount) {
            if (config.currency === "plt" && this.user.plt >= config.price) {
              console.log(`Buying ${config.amount} ${type} for ${config.price} PLT`);
              await this.buyItem(config.itemId, config.amount, config.price);
              await delay(1000);
            } else if (config.currency === "credits" && this.user.credits >= config.price) {
              console.log(`Buying ${config.amount} ${type} for ${config.price} Credits`);
              await this.buyItem(config.itemId, config.amount, config.price);
              await delay(1000);
            } else {
              console.log(`Insufficient ${config.currency} for rockets ${type}. Need ${config.price}, have ${config.currency === "plt" ? this.user.plt : this.user.credits}`);
            }
          }
        }
      }

      // Check booty keys
      if (this.settings.autobuy.key.enabled && this.user.bootyKeys < this.keyConfig.minAmount && this.user.plt >= this.settings.autobuy.key.savePLT) {
        if (this.user.plt >= this.keyConfig.price) {
          console.log(`Buying ${this.keyConfig.amount} Booty Key for ${this.keyConfig.price} PLT`);
          await this.buyItem(this.keyConfig.itemId, this.keyConfig.amount, this.keyConfig.price);
        } else {
          console.log(`Insufficient PLT for Booty Key. Need ${this.keyConfig.price}, have ${this.user.plt}`);
        }
      }
    } finally {
      this.buyInProgress = false;
    }
  }

  async buyItem(itemId, quantity, price) {
    console.log(`Buying - ${quantity} of item ${itemId} at price ${price}`);
    await this.client.sendPacket("ApiRequestPacket", {
      requestId: this.requestId,
      uri: "shop/buy",
      requestDataJson: {
        quantity,
        itemId,
        price,
      },
    });
    this.requestId++;
  }
};
