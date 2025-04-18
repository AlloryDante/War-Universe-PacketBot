module.exports = class User {
  constructor(client) {
    this.client = client;
    this.loaded = false;

    // Resources
    this.credits = 0; // BTC (3)
    this.plt = 0; // PLT (4)
    this.experience = 0; // EXP (5)
    this.honor = 0; // Honor (6)
    this.level = 0; // Level (7)
    this.bootyKeys = 0; // Keys (43)

    // Ammunition
    this.lasers = {
      RLX_1: 0, // type 1
      GLX_2: 0, // type 2
      BLX_3: 0, // type 3
      WLX_4: 0, // type 4 (cannot be bought)
      GLX_2_AS: 0, // type 5
      MRS_6X: 0, // type 6
    };

    this.rockets = {
      KEP_410: 0, // type 1
      NC_30: 0, // type 2
      TNC_130: 0, // type 3
    };

    this.energy = {
      EE: 0, // type 1
      EN: 0, // type 2
      EG: 0, // type 3
      EM: 0, // type 4
    };

    this.init();
  }

  init() {
    this.client.on("kryo_packet", (type, payload) => {
      if (type == "GameStateResponsePacket") return;

      //console.log(type, payload);

      //console.log(type, payload);
      if (type == "UserInfoResponsePacket") {
        // console.log(payload);
        // process.exit(0);

        for (const param of payload.params) {
          // Resources
          if (param.id == 3) this.credits = param.data;
          if (param.id == 4) this.plt = param.data;
          if (param.id == 5) this.experience = param.data;
          if (param.id == 6) this.honor = param.data;
          if (param.id == 7) this.level = param.data;
          if (param.id == 43) this.bootyKeys = param.data;

          // Lasers (id 8)
          if (param.id == 8) {
            switch (param.type) {
              case 1:
                this.lasers.RLX_1 = param.data;
                break;
              case 2:
                this.lasers.GLX_2 = param.data;
                break;
              case 3:
                this.lasers.BLX_3 = param.data;
                break;
              case 4:
                this.lasers.WLX_4 = param.data;
                break;
              case 5:
                this.lasers.GLX_2_AS = param.data;
                break;
              case 6:
                this.lasers.MRS_6X = param.data;
                break;
            }
          }

          // Rockets (id 9)
          if (param.id == 9) {
            switch (param.type) {
              case 1:
                this.rockets.KEP_410 = param.data;
                break;
              case 2:
                this.rockets.NC_30 = param.data;
                break;
              case 3:
                this.rockets.TNC_130 = param.data;
                break;
            }
          }

          // Energy (id 10)
          if (param.id == 10) {
            switch (param.type) {
              case 1:
                this.energy.EE = param.data;
                break;
              case 2:
                this.energy.EN = param.data;
                break;
              case 3:
                this.energy.EG = param.data;
                break;
              case 4:
                this.energy.EM = param.data;
                break;
            }
          }
        }
        this.loaded = true;
      }
    });
  }
};
