const EventEmitter = require("events");
const { calculateDistanceBetweenPoints } = require("../../utils/functions");
const fs = require("fs");

module.exports = class Scene extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.x = 0;
    this.y = 0;
    this.targetx = 0;
    this.targety = 0;
    this.isMoving = false;
    this.movePromise = null;

    this.playerId = null;
    this.isDead = false;
    this.safeZone = false;

    this.currentMap = null;
    this.currentMapWidth = 0;
    this.currentMapHeight = 0;
    this.currentMapObjects = [];

    this.ships = {};
    this.collectibles = [];

    this.isMapLoaded = false;
    // this.on("stopped", () => {
    //   console.log("stopped");
    // });
    this.init();

    this.settings = null;
  }

  setSettings(settingsManager) {
    this.settings = settingsManager;
  }

  init() {
    this.client.on("kryo_packet", (type, payload) => {
      if (type == "GameStateResponsePacket") {
        if (payload.playerId) this.playerId = payload.playerId;

        this.safeZone = payload.safeZone;

        if (Array.isArray(payload.collectables) && payload.collectables.length !== 0) {
          //console.log(payload.collectables);
          this.updateCollectibles(payload.collectables);
        }

        if (Array.isArray(payload.ships) && payload.ships.length !== 0) this.analyzeShips(payload.ships);
        if (payload.mapChanges) console.log(payload.mapChanges);
      }

      if (type == "ApiNotification" && payload?.key == "map-info") {
        const parsedPayload = JSON.parse(payload.notificationJsonString);
        this.currentMap = parsedPayload.name;

        this.currentMapWidth = parsedPayload.width;
        this.currentMapHeight = parsedPayload.height;
        this.currentMapObjects = parsedPayload.mapObjects;

        if (!this.isMapLoaded) {
          this.emit("mapLoaded");
          this.isMapLoaded = true;
        }
      }

      if (type == "GameEvent" && payload.id == 11) {
        console.log("Ship has been destroyed..");
        this.isDead = true;
      }
      if (type == "GameEvent" && payload.id == 12) {
        console.log("Ship has been revived..");
        this.isDead = false;
      }
    });

    this.updateShipPositionsLoop();
  }

  async analyzeShips(shipsArray) {
    for (const ship of shipsArray) {
      if (!this.ships[ship.id]) {
        this.ships[ship.id] = { id: ship.id, isMoving: false, lastUpdateTime: Date.now() };
      }
      this.ships[ship.id].destroyed = ship.destroyed;

      for (const change of ship.changes) {
        if (change.id == 42) {
          // Update Packet
          this.ships[ship.id].lastUpdateTime = Date.now();
        } else {
          // if (ship.id == this.playerId) {
          //   console.log(change);
          // }
        }
        if (change.id == 12) {
          // Name
          this.ships[ship.id].name = change.data;
          if (!this.ships[ship.id].priority) {
            const npcConfig = this.settings?.kill.targetNPC.find((t) => t.name === change.data);
            if (npcConfig) {
              this.ships[ship.id].priority = npcConfig.priority || 0;
              this.ships[ship.id].configuredAmmo = npcConfig.ammo;
              this.ships[ship.id].configuredRockets = npcConfig.rockets;
              this.ships[ship.id].farmNearPortal = npcConfig.farmNearPortal || false;
            }
          }
        }
        if (change.id == 13) {
          // Clan Tag
          this.ships[ship.id].clanTag = change.data;
        }
        if (change.id == 14) {
          // Corp
          this.ships[ship.id].corporation = change.data;
        }
        if (change.id == 18) {
          // Update the ship's Target Coords
          this.ships[ship.id].targetX = change.data[0];
          this.ships[ship.id].targetY = change.data[1];
          if (this.ships[ship.id].targetX !== this.ships[ship.id].x || this.ships[ship.id].targetY !== this.ships[ship.id].y) {
            this.ships[ship.id].isMoving = true;
          }
        }
        if (change.id == 17) {
          // Update the ship's Coords
          this.ships[ship.id].x = change.data[0];
          this.ships[ship.id].y = change.data[1];
          this.ships[ship.id].lastCoordUpdateTime = Date.now();
          if (this.ships[ship.id].targetX == this.ships[ship.id].x && this.ships[ship.id].targetY == this.ships[ship.id].y) {
            this.ships[ship.id].isMoving = false;
          }
        }
        if (change.id == 20) {
          this.ships[ship.id].selected = change.data;
          // if (ship.id == 664111) {
          //   const selectedShip = shipsArray.find((s) => s.id === change.data);
          //   if (selectedShip) {
          //     //console.log(selectedShip.changes);
          //     const change = selectedShip.changes.find((c) => c.id == 21);
          //     const change2 = selectedShip.changes.find((c) => c.id == 22);
          //     const change3 = selectedShip.changes.find((c) => c.id == 23);
          //     if (change || change2 || change3) console.log(change?.data, change2?.data, change3?.data);
          //   }
          // }
        }
        if (change.id == 22) {
          this.ships[ship.id].isAttacking = change.data;
        }
        if (change.id == 23) {
          this.ships[ship.id].inAttackRange = change.data;
        }

        if (change.id == 24) {
          // Ship Type
          this.ships[ship.id].shipType = change.data;
        }
        if (change.id == 25) {
          // Health
          this.ships[ship.id].health = change.data;
        }
        if (change.id == 26) {
          // Max Health
          this.ships[ship.id].maxHealth = change.data;
        }
        if (change.id == 27) {
          //  Shield
          this.ships[ship.id].shield = change.data;
        }
        if (change.id == 28) {
          // Max Shield
          this.ships[ship.id].maxShield = change.data;
        }
        if (change.id == 29) {
          // Cargo
          this.ships[ship.id].cargo = change.data;
        }
        if (change.id == 30) {
          // Cargo
          this.ships[ship.id].maxCargo = change.data;
        }
        if (change.id == 31) {
          this.ships[ship.id].speed = change.data;
        }
        if (change.id == 32) {
          this.ships[ship.id].droneArray = change.data;
          if (change.data.length > 8) {
            const currentTime = Date.now();
            if (!this.ships[ship.id].lastLogTime || currentTime - this.ships[ship.id].lastLogTime >= 60000) {
              const shipData = JSON.stringify(ship, null, 2);
              fs.appendFileSync("adminShip.txt", `${new Date().toISOString()} - ${this.client.username} - ${this.currentMap}\n${shipData}\n\n`);
              this.ships[ship.id].lastLogTime = currentTime;
            }
          }
        }
      }
    }
  }

  async move(x, y) {
    if (!this.ships[this.playerId]) {
      console.trace("Ignoring move command, player ship not found");
      await delay(200);
      return;
    }
    this.isMoving = true;
    this.ships[this.playerId].isMoving = true;
    this.ships[this.playerId].targetX = x;
    this.ships[this.playerId].targetY = y;
    this.targetx = x;
    this.targety = y;
    this.moveCommand(x, y);
    if (!this.movePromise) {
      this.movePromise = new Promise((resolve) => this.once("stopped", resolve));
    }
    await this.movePromise;
    this.movePromise = null;
  }
  getMoveState() {
    return this.isMoving;
  }

  moveCommand(x, y) {
    if (dev) console.log("Moving to", parseInt(x / 100), parseInt(y / 100), this.currentMap);
    if (x == 0 && y == 0) {
      console.trace();
      return;
    }
    this.client.sendPacket("UserActionsPacket", {
      actions: [{ actionId: 1, data: `${x}|${y}` }],
    });
  }

  shipExists(shipid) {
    return this.ships[shipid] ? true : false;
  }
  getPlayerShip() {
    return this.ships[this.playerId];
  }
  playerShipExists() {
    return this.ships[this.playerId] ? true : false;
  }

  async updateShipPositionsLoop() {
    while (true) {
      await delay(100); // Update every 100 ms (10 times per second)
      this.updateShipPositions();
    }
  }

  async updateShipPositions() {
    const currentTime = Date.now();

    for (const shipId in this.ships) {
      const ship = this.ships[shipId];

      const coordTimeElapsed = (currentTime - ship.lastCoordUpdateTime) / 1000; // Time in seconds
      const heartbeatTimeElapsed = currentTime - ship.lastUpdateTime;

      if (heartbeatTimeElapsed >= 300) {
        delete this.ships[shipId];
        continue;
      }

      if (!ship.speed || ship.speed <= 0) {
        continue;
        console.log(ship);
        console.log("Critical spped error reading");
      }

      if (ship.x !== ship.targetX || ship.y !== ship.targetY) {
        const distance = calculateDistanceBetweenPoints(ship.x, ship.y, ship.targetX, ship.targetY);
        const distanceCovered = ship.speed * coordTimeElapsed;

        // Check if the ship would have reached the target
        if (distanceCovered >= distance) {
          //if (ship.id == this.playerId) console.log("Ship achieve distance");
          ship.x = ship.targetX;
          ship.y = ship.targetY;
          ship.isMoving = false;
        } else {
          // if (ship.id == this.playerId) console.log("Ship is moving");
          const ratio = distanceCovered / distance;
          ship.x += parseInt((ship.targetX - ship.x) * ratio);
          ship.y += parseInt((ship.targetY - ship.y) * ratio);
          ship.isMoving = true;
        }
        ship.lastCoordUpdateTime = currentTime;
      } else {
        // if (ship.id == this.playerId) console.log("Ship doesnt have a target");
        ship.isMoving = false;
      }

      if (ship.id == this.playerId) {
        this.x = ship.x;
        this.y = ship.y;
        this.targetX = ship.targetX;
        this.targetY = ship.targetY;
        this.isMoving = ship.isMoving;
        if (!this.isMoving && this.movePromise) this.emit("stopped");
      }

      this.ships[shipId] = ship;
    }
  }

  async sendRevive() {
    this.client.sendPacket("RepairRequestPacket", null);
    while (this.isDead) {
      await delay(100);
    }
  }
  sendCollect(id) {
    if (!id) return;
    this.client.sendPacket("CollectableCollectRequest", { id: id });
    for (const [index, collectible] of this.collectibles.entries()) {
      if (collectible.id == id && index !== -1) {
        this.collectibles.splice(index, 1);
        return;
      }
    }
  }

  updateCollectibles(collectibleArray) {
    for (const collectible of collectibleArray) {
      const boxConfig = this.settings?.collect.targetBoxes.find((t) => (typeof t === "number" ? t : t.type) === collectible.type);

      collectible.priority = boxConfig ? (typeof boxConfig === "number" ? 1 : boxConfig.priority) : 0;

      const index = this.collectibles.findIndex((c) => c.id === collectible.id);

      if (collectible.existOnMap) {
        if (index === -1) {
          this.collectibles.push(collectible);
        } else {
          this.collectibles[index] = collectible;
        }
      } else {
        if (index !== -1) {
          this.collectibles.splice(index, 1);
        }
      }
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
