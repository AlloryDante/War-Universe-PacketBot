const GameClient = require("../modules/GameClient.js");

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

  const drawBar = ({ x, y, width, height, color = "white" }) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
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

    // Name of the map
    drawText({ text: client.scene.currentMap, x: canvas.width / 2 - 50, y: canvas.height / 2, size: 50, opacity: 0.2 });

    // Static elements
    drawBar({ x: 10, y: canvas.height - 40, width: 320, height: 15, color: "#1b5922" });
    drawBar({ x: 10, y: canvas.height - 40, width: 290, height: 15, color: "lime" });
    drawText({ text: "76,000 / 96,000", x: 120, y: canvas.height - 28 });

    drawBar({ x: 10, y: canvas.height - 20, width: 320, height: 15, color: "aqua" });
    drawText({ text: "210,000 / 210,000", x: 120, y: canvas.height - 8 });

    // Environment elements
    Object.values(client.scene.currentMapObjects).forEach(pos => pos.type === "NORMAL_TELEPORT" && drawPortal({
      x: pos.x,
      y: pos.y,
    }));

    // Player
    const playerShip = Object.values(client.scene.ships).find((ship) => ship.id === playerId);
    if (playerShip) {
      drawPlayer({ x: playerShip.x, y: playerShip.y, cross: true });
    }

    // NPCs
    Object.values(client.scene.ships).filter((ship) => ship.id !== playerId).forEach(attrs => drawEnemy({
      x: attrs.x,
      y: attrs.y,
    }));

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



