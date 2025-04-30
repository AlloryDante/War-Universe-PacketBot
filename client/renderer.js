const GameClient = require("../modules/GameClient.js");

const CORPORATIONS_TYPES = {
  NONE: 0,
  U: 1,
  E: 2,
  R: 3,
}

const OBJECT_TYPES = {
  NORMAL_TELEPORT: "NORMAL_TELEPORT",
  SPACE_STATION: "SPACE_STATION",
  TRADE_STATION: "TRADE_STATION",
  QUEST_STATION: "QUEST_STATION",
}

const COLLECTABLE_TYPES = {
  BONUS_BOX: 0,
  CARGO_BOX: 1,
  GREEN_BOX: 3,
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("overflow-hidden");

  let currentMapWidth = 0;
  let currentMapHeight = 0;

  let playerId = null;

  let scaleX = 1
  let scaleY = 1;

  const scalePosition = ({ x, y }) => ({
    x: x * scaleX,
    y: y * scaleY,
  });

  const drawEnemy = ({ color = "red", width = 5, height = 5, x, y }) => {
    const pos = scalePosition({ x, y });
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, width, height);
  }

  const drawPortal = ({ color = "gray", width = 15, height = 15, x, y }) => {
    const pos = scalePosition({ x, y });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.min(width, height) / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }

  const drawPlayer = ({ color = "white", width = 8, height = 8, x, y, cross = false }) => {
    const pos = scalePosition({ x, y });
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    if (!cross) return;

    const crossColor = `rgba(255, 255, 255, 0.5)`;

    ctx.beginPath();
    ctx.strokeStyle = crossColor
    ctx.moveTo(0, pos.y + height / 2);
    ctx.lineTo(canvas.width, pos.y + height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = crossColor
    ctx.moveTo(pos.x + width / 2, 0);
    ctx.lineTo(pos.x + width / 2, canvas.height);
    ctx.stroke();
  };

  const drawText = ({ text, x, y, size = 11, opacity = 1 }) => {
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, x, y);
  }

  const drawDirectional = ({ x1, y1, x2, y2 }) => {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const drawSpaceStation = ({ x, y, radius = 15 }) => {
    const color = `rgba(255, 255, 255, 0.5)`;
    const pos = scalePosition({ x, y });
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    drawSurroundingCircles({ x: pos.x, y: pos.y, radius, smallRadius: radius / 3, count: 12, color });
  }

  const drawQuestStation = ({ x, y, radius = 10 }) => {
    const pos = scalePosition({ x, y });
    ctx.fillStyle = `rgba(103, 27, 255, 0.79)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  const drawSurroundingCircles = ({
                                    x,
                                    y,
                                    radius,
                                    smallRadius = radius / 3,
                                    count = 12,
                                    color = `rgba(255, 255, 255, 0.9)`
                                  }) => {
    const angleStep = (2 * Math.PI) / count;
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      const smallX = x + (radius + smallRadius) * Math.cos(angle);
      const smallY = y + (radius + smallRadius) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(smallX, smallY, smallRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  };

  const drawTradeStation = ({ x, y, radius = 10 }) => {
    const pos = scalePosition({ x, y });
    ctx.fillStyle = `rgba(188, 143, 61, 0.94)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  };

  const drawBar = ({ x, y, width, height, color = "white" }) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  const drawCollectable = ({ x, y, type, width = 3, height = 3 }) => {
    let color;

    switch (type) {
      case COLLECTABLE_TYPES.BONUS_BOX:
        color = "#ffdb00";
        break;
      case COLLECTABLE_TYPES.CARGO_BOX:
        color = "#c58a59";
        break;
      case COLLECTABLE_TYPES.GREEN_BOX:
        color = "#a4ffb4";
        break;
      default:
        color = "white";
    }

    const pos = scalePosition({ x, y });
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, width, height);
  }

  const client = new GameClient({
    username: "prueba123456",
    password: "prueba123456",
    serverId: "eu1",
  });

  const render = () => {
    if (!client.client.clientLoaded) return requestAnimationFrame(render);

    currentMapWidth = client.scene.currentMapWidth || currentMapWidth;
    currentMapHeight = client.scene.currentMapHeight || currentMapHeight;

    scaleX = canvas.width / currentMapWidth;
    scaleY = canvas.height / currentMapHeight;

    playerId = client.scene.playerId

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Status
    drawText({ text: `Status: ${client.status}`, x: 10, y: 20 });

    // Name of the map
    drawText({ text: client.scene.currentMap, x: canvas.width / 2 - 50, y: canvas.height / 2, size: 50, opacity: 0.2 });

    // Static elements
    drawBar({ x: 10, y: canvas.height - 40, width: 320, height: 15, color: "#1b5922" });
    drawBar({ x: 10, y: canvas.height - 40, width: 290, height: 15, color: "lime" });
    drawText({ text: "76,000 / 96,000", x: 120, y: canvas.height - 28 });

    drawBar({ x: 10, y: canvas.height - 20, width: 320, height: 15, color: "aqua" });
    drawText({ text: "210,000 / 210,000", x: 120, y: canvas.height - 8 });

    // Environment elements
    Object.values(client.scene.currentMapObjects).forEach(pos => {
      pos.type === OBJECT_TYPES.NORMAL_TELEPORT && drawPortal({
        x: pos.x,
        y: pos.y,
      })

      pos.type === OBJECT_TYPES.SPACE_STATION && drawSpaceStation({
        x: pos.x,
        y: pos.y,
      })

      pos.type === OBJECT_TYPES.TRADE_STATION && drawTradeStation({
        x: pos.x,
        y: pos.y,
      })

      pos.type === OBJECT_TYPES.QUEST_STATION && drawQuestStation({
        x: pos.x,
        y: pos.y,
      })
    });

    // Collectables
    // Environment elements
    Object.values(client.scene.collectibles).forEach(pos => drawCollectable({
      x: pos.x,
      y: pos.y,
      type: pos.type
    }));

    // NPCs
    Object.values(client.scene.ships).filter((ship) => ship.corporation === CORPORATIONS_TYPES.NONE).forEach(attrs => drawEnemy({
      x: attrs.x,
      y: attrs.y,
    }));

    // Player
    const playerShip = Object.values(client.scene.ships).find((ship) => ship.id === playerId);
    if (playerShip) {
      drawPlayer({ x: playerShip.x, y: playerShip.y, cross: true });
    }

    // Directional lines
    // drawDirectional({ x1: 100, y1: 100, x2: 725, y2: 510, })

    // Stats
    drawText({ text: "BTC:", x: 20, y: 250, })
    drawText({ text: "0", x: 50, y: 250, })

    drawText({ text: "PLT:", x: 20, y: 265, })
    drawText({ text: "0", x: 50, y: 265, })

    drawText({ text: "HNR:", x: 20, y: 280, })
    drawText({ text: "0", x: 50, y: 280, })

    drawText({ text: "EXP:", x: 20, y: 295, })
    drawText({ text: "0", x: 50, y: 295, })

    drawEnemy({ x: 15000, y: 10000, color: "red", width: 5, height: 5 });

    console.log(client)
    requestAnimationFrame(render);
  }

  render();
});



