const { calculateDistanceBetweenPoints } = require("../../utils/functions");
const mapConfigurations = require("../../utils/mapRegions");

module.exports = class Kill {
  constructor(client, scene, navigation, config, stateManager, settingsManager, stats) {
    this.client = client;
    this.scene = scene;
    this.navigation = navigation;
    this.config = config;
    this.state = stateManager;
    this.settings = settingsManager;
    this.stats = stats;

    this.state.kill.killInProgress = false;
    this.state.kill.targetedID = null;
    this.state.kill.selected = false;
    this.state.kill.attacking = false;
    this.state.kill.antibanMoving = false;
    this.state.kill.lastMoveTimestammp = 0;
    this.state.kill.currentAmmo = null;
    this.state.kill.currentRocket = null;

    this.PORTAL_FARMING_DISTANCE = 3000;
    this.antibanTime = 15000;
  }

  start() {
    if (this.state.kill.enabled) return;
    if (this.settings.kill.targetNPC.length === 0) {
      throw new Error("NPC list is not set!");
    }
    this.state.kill.enabled = true;
    this.activateKillLoop();
  }
  stop() {
    this.state.kill.enabled = false;
    this.resetState();
  }

  async activateKillLoop() {
    console.log("Activating kill loop");
    while (this.state.kill.enabled) {
      this.update();
      this.antibanMove();
      await delay(100);
    }
  }

  async antibanMove() {
    if (!this.settings.antiban.randomMovement) return;
    if (this.scene.isMoving) {
      this.state.kill.lastMoveTimestammp = Date.now();
    }

    // Check if we need to trigger antiban movement
    if (Date.now() - this.state.kill.lastMoveTimestammp > this.antibanTime && this.state.kill.attacking && !this.state.collect.collecting) {
      console.log("Antiban moving");
      this.stats.messageState = "Antiban moving";
      this.state.kill.lastMoveTimestammp = Date.now();
      this.state.kill.antibanMoving = true;
      this.antibanTime = 20000 + Math.floor(Math.random() * 10000);

      // Function to generate a random offset with a random sign
      const randomOffset = () => Math.floor(Math.random() * 100) * 5;
      const randomSign = () => (Math.random() < 0.5 ? 1 : -1);
      let xOffset = randomOffset() * randomSign();
      let yOffset = randomOffset() * randomSign();
      let newX = this.scene.x + xOffset;
      let newY = this.scene.y + yOffset;

      // Ensure the new coordinates are within bounds
      const isValidCoordinate = (x, y) => {
        return x >= 0 && y >= 0 && x <= this.scene.currentMapWidth && y <= this.scene.currentMapHeight;
      };

      // If the new coordinates are out of bounds, log and skip the move
      if (isValidCoordinate(newX, newY)) {
        await this.navigation.move(newX, newY);
      } else {
        console.log("Ignored out-of-bounds move: ", { x: newX, y: newY });
        this.stats.messageState = "Antiban moving - Out of bounds";
      }

      this.state.kill.antibanMoving = false;
    }
  }

  async update() {
    if (!this.state.kill.targetedID) {
      if (this.state.detectors.break.breakAdviced) return;
      if (this.state.detectors.health.healthAdviced) return;

      this.state.kill.targetedID = await this.findEnemyWhileMoving();
    } else {
      await this.kill(this.state.kill.targetedID);
    }
  }

  async kill(npcID) {
    if (!this.state.kill.killInProgress) {
      this.stats.messageState = "Killing - Npc...";
      this.state.kill.killInProgress = true;
      const distance = this.navigation.getDistanceToId(npcID);
      if (!distance) return this.resetState();

      if (distance > 500 && !this.state.kill.attacking) {
        this.config.switchFlyMode();
        this.navigation.startFollowing(npcID);
      }

      await this.initiateAttack(npcID);

      const ship = this.scene.ships[npcID];
      if (ship?.farmNearPortal) {
        await this.handlePortalFarming(npcID);
      }
      await this.awaitKill(npcID);
      this.stats.messageState = "NPC killed";
    }
  }

  async awaitKill(npcID) {
    while (this.state.kill.attacking && this.state.kill.enabled) {
      await delay(100);
      const playerShip = this.scene.getPlayerShip();
      if (playerShip && playerShip.selected != npcID) {
        this.stats.incrementKills();
        return this.resetState();
      }

      const distance = this.navigation.getDistanceToId(npcID);
      if (!distance || distance > 1200) {
        return this.resetState();
      }
    }
  }

  async initiateAttack(npcID) {
    while (this.state.kill.attacking == false && this.state.kill.enabled) {
      if (!this.scene.shipExists(npcID)) {
        this.resetState();
        return;
      }

      await this.selectTarget(npcID);

      const distance = this.navigation.getDistanceToId(npcID);
      if (!distance) return this.resetState();

      if (distance < 600 && this.state.kill.selected) {
        this.config.switchAttackMode();
        this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 3 }] });
        this.state.kill.attacking = true;
        this.navigation.stopFollowing();

        const ship = this.scene.ships[npcID];
        if (!ship) {
          this.resetState();
          return;
        }

        if (ship.configuredAmmo !== this.state.kill.currentAmmo) {
          await delay(100);
          await this.switchAmmo(ship.configuredAmmo);
        }

        if (ship.configuredRockets !== this.state.kill.currentRocket) {
          await delay(100);
          await this.switchRocket(ship.configuredRockets);
        }
      }
      await delay(20);
    }
  }

  async selectTarget(npcID) {
    if (!this.scene.shipExists(npcID)) return false;

    if (!this.state.kill.selected && this.navigation.getDistanceToId(npcID) < 700) {
      this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 2, data: npcID }] });
      this.state.kill.selected = true;
    }
    return this.state.kill.selected;
  }

  async findEnemyWhileMoving() {
    while (!this.state.kill.targetedID && this.state.kill.enabled) {
      const closestEnemyShip = await this.findEnemy();

      if (closestEnemyShip) {
        return closestEnemyShip;
      }

      if (!this.scene.isMoving) {
        this.stats.messageState = "Killing - Roaming";
        this.config.switchFlyMode();
        this.navigation.moveToRandomPoint();
        await delay(1000); //We can have an ignore flag set here
      }
      await delay(20);
    }
  }

  async findEnemy() {
    const closestEnemyShip = this.findClosestEnemyWithPriority(this.scene.x, this.scene.y);

    if (closestEnemyShip) {
      if (closestEnemyShip.distance > 2000) {
        return null;
      }
      return closestEnemyShip.id;
    }
    return null;
  }

  async switchAmmo(ammoType) {
    if (ammoType < 1 || ammoType > 6) {
      console.log(`Invalid ammo type: ${ammoType}`);
      return;
    }

    console.log(`Switching to ammo x${ammoType}`);
    this.stats.messageState = `Killing - Switching to ammo x${ammoType}`;
    this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 12, data: ammoType }] });
    this.state.kill.currentAmmo = ammoType;
  }

  async switchRocket(rocketType) {
    if (!rocketType || rocketType < 1 || rocketType > 8) {
      // Assuming rockets are 1-8, adjust if needed
      console.log(`Invalid rocket type: ${rocketType}`);
      return;
    }

    console.log(`Switching to rocket type ${rocketType}`);
    this.stats.messageState = `Killing - Switching to rocket ${rocketType}`;
    this.client.sendPacket("RocketSwitchRequest", { rocketId: rocketType });
    this.state.kill.currentRocket = rocketType;
  }

  resetState() {
    this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 4 }] });
    this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 2, data: 0 }] });
    this.state.kill.killInProgress = false;
    this.state.kill.attacking = false;
    this.state.kill.targetedID = null;
    this.state.kill.selected = false;
    this.navigation.stopFollowing();
  }

  async handlePortalFarming(npcID) {
    const ship = this.scene.ships[npcID];
    if (!ship || !this.state.kill.attacking) return;

    const currentMap = this.scene.currentMap;
    if (!mapConfigurations[currentMap]) {
      console.log(`No portals defined for map: ${currentMap}`);
      return;
    }

    // Find closest safe portal (excluding PvP zones)
    const portals = mapConfigurations[currentMap].filter((p) => p.to !== "T-1" && p.to !== "G-1");
    let closestPortal = null;
    let shortestDistance = Infinity;

    for (const portal of portals) {
      const distance = calculateDistanceBetweenPoints(this.scene.x, this.scene.y, portal.x, portal.y);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestPortal = portal;
      }
    }

    if (!closestPortal) return;

    // If we're too far from portal, move closer while keeping NPC engaged
    console.log("distance", shortestDistance);
    if (shortestDistance > this.PORTAL_FARMING_DISTANCE) {
      const angleToPortal = Math.atan2(closestPortal.y - this.scene.y, closestPortal.x - this.scene.x);

      // Calculate a position that's at least 1000 units away from portal
      const targetX = closestPortal.x - Math.cos(angleToPortal) * 1200;
      const targetY = closestPortal.y - Math.sin(angleToPortal) * 1200;

      // Move in small increments to keep NPC following
      while (this.state.kill.attacking && this.scene.shipExists(npcID)) {
        const currentPortalDistance = calculateDistanceBetweenPoints(this.scene.x, this.scene.y, closestPortal.x, closestPortal.y);
        if (currentPortalDistance <= this.PORTAL_FARMING_DISTANCE) break;

        const playerShip = this.scene.getPlayerShip();
        if (!playerShip.inAttackRange) {
          console.log("Player ship is not in attack range, waiting");
          await delay(1000);
          continue;
        }

        const moveX = parseInt(this.scene.x + Math.cos(angleToPortal) * 600);
        const moveY = parseInt(this.scene.y + Math.sin(angleToPortal) * 600);

        // Don't move too close to portal
        if (calculateDistanceBetweenPoints(moveX, moveY, closestPortal.x, closestPortal.y) < 1000) {
          break;
        }
        await this.navigation.move(moveX, moveY);
        await delay(100);
      }
    }
  }

  findClosestEnemyWithPriority(playerX, playerY) {
    let bestTarget = null;
    let bestScore = -Infinity;
    const mapShips = this.scene.ships;

    for (const shipId in mapShips) {
      const ship = mapShips[shipId];

      // Skip if ship is not in our target list
      if (!ship.priority) continue;

      // Check if any other ship is attacking this target
      const isBeingAttacked = Object.values(mapShips).some((otherShip) => otherShip.selected === ship.id && otherShip.isAttacking);

      // Skip if the ship is being attacked by another player
      if (isBeingAttacked) continue;

      const distance = Math.sqrt(Math.pow(playerX - ship.x, 2) + Math.pow(playerY - ship.y, 2));
      const distanceScore = 1 - Math.min(distance / 2000, 1);

      let score = ship.priority * 1000 + distanceScore * 100;

      // Add massive priority boost if the ship is attacking the player

      if (this.settings.kill.targetEngagedNPC) {
        const isAttackingPlayer = ship.selected === this.scene.playerId && ship.isAttacking;
        if (isAttackingPlayer) {
          score += 10000; // Significant boost to prioritize attacking ships
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestTarget = {
          ...ship,
          distance,
        };
      }
    }

    return bestTarget;
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
