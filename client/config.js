module.exports = {
  workMap: "U-2",
  killTargets: [{ name: "-=(Hydro)=-", priority: 1, ammo: 1, rockets: 1, farmNearPortal: false }],
  collectBoxTypes: [{ type: 0, priority: 1 }],
  minHP: 10,
  adviceHP: 70,
  kill: {
    targetEngagedNPC: false,
  },
  admin: {
    enabled: false,
    delay: 5,
  },
  escape: {
    enabled: false,
    delay: 20000,
  },
  config: {
    switchConfigOnShieldsDown: false,
    attacking: 1,
    fleeing: 2,
    flying: 2,
  },
  enrichment: {
    // Laser enrichment materials: 0=Disabled, 4=Darkonit, 5=Uranit, 7=Dungid
    lasers: { enabled: false, materialType: 0 },
    // Generator enrichment materials: 0=Disabled, 5=Uranit, 6=Azurit, 8=Xureon
    rockets: { enabled: false, materialType: 0 },
    shields: { enabled: false, materialType: 0, amount: 10, minAmount: 10 },
    speed: { enabled: false, materialType: 0, amount: 10, minAmount: 10 },
  },
  autobuy: {
    laser: {
      RLX_1: true,
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
  },
  break: {
    interval: 0, // 1 hour
    duration: 0, // 5 minutes
  }
}
