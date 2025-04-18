//Must implement ways to make antibot navigation
const { getRandomPoint, calculateDistanceBetweenPoints } = require("../../utils/functions");
const mapConfigurations = require("../../utils/mapRegions");

module.exports = class Navigation {
  constructor(client, scene, stateManager) {
    this.client = client;
    this.scene = scene;
    this.state = stateManager;

    this.state.navigation.inNavigation = false;
    this.state.navigation.following = false;
  }

  //Make this an update function
  async startFollowing(shipId) {
    if (this.state.navigation.following) {
      console.log(`Ship is already following an ID`);
      return;
    }
    this.state.navigation.following = true;
    const threshold = 500;

    while (this.state.navigation.following && this.scene.shipExists(shipId)) {
      const ship = this.scene.ships[shipId];
      if (!ship) {
        this.state.navigation.following = false;
        return;
      }

      const distance = calculateDistanceBetweenPoints(this.scene.x, this.scene.y, ship.x, ship.y);

      if (distance > threshold) {
        // Predict future position if ship is moving
        let targetX = ship.x;
        let targetY = ship.y;

        if (ship.isMoving && ship.targetX && ship.targetY) {
          // Calculate movement vector
          const moveVectorX = ship.targetX - ship.x;
          const moveVectorY = ship.targetY - ship.y;

          // Predict position ahead (about 1-2 seconds of movement)
          const predictionFactor = Math.min(1, (distance - threshold) / 4000); // Decrease prediction by half
          targetX = ship.x + parseInt(moveVectorX * predictionFactor);
          targetY = ship.y + parseInt(moveVectorY * predictionFactor);
        }

        // Add natural randomization to movement
        const randomOffset = () => (Math.random() - 0.5) * Math.min(300, distance * 0.3);
        targetX += randomOffset();
        targetY += randomOffset();

        // Ensure we're not moving outside map bounds
        targetX = Math.max(0, Math.min(this.scene.currentMapWidth, targetX));
        targetY = Math.max(0, Math.min(this.scene.currentMapHeight, targetY));

        // Only move if we're not too close to our current position
        const moveDistance = calculateDistanceBetweenPoints(this.scene.x, this.scene.y, targetX, targetY);
        if (moveDistance > 100) {
          this.scene.move(Math.floor(targetX), Math.floor(targetY));
        }
      }

      // Randomize delay between movements
      await delay(200 + Math.random() * 900);
    }
  }
  async stopFollowing() {
    this.state.navigation.following = false;
  }

  async break() {
    this.scene.move(this.scene.ships[this.scene.playerId].x, this.scene.ships[this.scene.playerId].y);
  }

  getDistanceToId(shipID) {
    const shipCoords = this.getShipCoords(shipID);
    if (!shipCoords) return null;
    return calculateDistanceBetweenPoints(this.scene.x, this.scene.y, shipCoords.x, shipCoords.y);
  }
  async move(x, y) {
    await this.scene.move(x, y);
  }
  moveToRandomPoint() {
    const randomPoint = this.getRandomMapPoint();
    this.scene.move(randomPoint.x, randomPoint.y);
  }

  getRandomMapPoint() {
    if (!this.scene.currentMapWidth && !this.scene.currentMapHeight) return { x: 0, y: 0 };
    return getRandomPoint(this.scene.currentMapWidth, this.scene.currentMapHeight);
  }

  getShipCoords(shipID) {
    const masterShip = this.scene.ships[shipID];
    if (masterShip) {
      return { x: masterShip.x, y: masterShip.y };
    } else {
      return null;
    }
  }

  async goToMap(destinationMapName) {
    if (this.state.navigation.inNavigation) return;
    this.state.navigation.inNavigation = true;
    while (this.scene.currentMap != destinationMapName) {
      const destinationPortal = navigate(this.scene.currentMap, destinationMapName);
      if (!destinationPortal) {
        console.log(`No destination portal found from ${this.scene.currentMap} to ${destinationMapName}`);
        this.state.navigation.inNavigation = false;
        return;
      }
      if (this.state.recover.enabled || this.state.escape.enabled) {
        await delay(1000);
      } else {
        await this.scene.move(destinationPortal.x, destinationPortal.y);
      }

      if (this.scene.x == destinationPortal.x && this.scene.y == destinationPortal.y) {
        console.log("Arrived to teleport point..");
        await this.client.sendPacket("UserActionsPacket", { actions: [{ actionId: 6 }] });
        await delay(6000);
      }
      await delay(100);
    }
    this.state.navigation.inNavigation = false;
    console.log(`Arrived at destination ${destinationMapName}`);
  }
};

// Navigator function to determine the portal to use
function navigate(currentMap, destinationMap) {
  const path = findPath(currentMap, destinationMap);

  if (!path || path.length === 0) {
    return null;
  }

  // Return the first portal to use in the path
  const firstStep = path[0];
  return { x: firstStep.portal.x, y: firstStep.portal.y };
}

function findPath(currentMap, destinationMap) {
  const queue = [{ map: currentMap, path: [] }];
  const visited = new Set();

  while (queue.length > 0) {
    const { map, path } = queue.shift();

    if (visited.has(map)) {
      continue;
    }

    visited.add(map);

    const currentMapConfig = mapConfigurations[map];
    if (!currentMapConfig) {
      //console.error(`Map configuration for ${map} not found.`);
    } else {
      for (const portal of currentMapConfig) {
        if (portal.to === destinationMap) {
          return [...path, { map, portal }];
        }

        queue.push({ map: portal.to, path: [...path, { map, portal }] });
      }
    }
  }

  console.error(`No path from ${currentMap} to ${destinationMap} found.`);
  return null;
}
