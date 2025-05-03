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

const NPC_TYPES = [
  "-=(Hydro)=-",
  "-=(Hyper|Hydro)=-",
  "-=(Jenta)=-",
  "-=(Hyper|Jenta)=-",
  "-=(Mali)=-",
  "-=(Hyper|Mali)=-",
  "-=(Plarion)=-",
  "-=(Hyper|Plarion)=-",
  "-=(Motron)=-",
  "-=(Hyper|Motron)=-",
  "-=(Xeon)=-",
  "-=(Hyper|Xeon)=-",
  "-=(Bangoliour)=-",
  "-=(Hyper|Bangoliour)=-",
  "-=(Zavientos)=-",
  "-=(Magmius)=-",
  "-=(Hyper|Magmius)=-",
  "-=(Raider)=-",
  "-=(Hyper|Raider)=-",
  "-=(Vortex)=-",
  "-=(Hyper|Vortex)=-",
  "-=(Quattroid)=-",
];

const COLLECTABLE_DATA_TABLE = [
  { type: COLLECTABLE_TYPES.BONUS_BOX, name: "Bonus box", storageKey: `collectable-${COLLECTABLE_TYPES.BONUS_BOX}` },
  { type: COLLECTABLE_TYPES.CARGO_BOX, name: "Cargo box", storageKey: `collectable-${COLLECTABLE_TYPES.CARGO_BOX}` },
  { type: COLLECTABLE_TYPES.GREEN_BOX, name: "Green box", storageKey: `collectable-${COLLECTABLE_TYPES.GREEN_BOX}` },
];

const KILLABLE_DATA_TABLE = NPC_TYPES.map(name => ({
  name,
  storageKey: `killable-${name}`
}));

let client;

document.addEventListener("DOMContentLoaded", () => {
  const adapterSettings = () => {
    return {
      workMap: JSON.parse(localStorage.getItem("workMap")) || "U-1",
      killTargets: [
        ...Object.keys(localStorage)
          .filter(key => key.startsWith("target>killable-"))
          .map(key => {
            const name = key.replace("target>killable-", "");
            return {
              name,
              priority: JSON.parse(localStorage.getItem(`priority>killable-${name}`)) || 1,
              ammo: JSON.parse(localStorage.getItem(`ammo>killable-${name}`)) || 1,
              rockets: JSON.parse(localStorage.getItem(`rocket>killable-${name}`)) || 1,
              farmNearPortal: false
            };
          }),
      ],
      collectBoxTypes: [
        ...Object.keys(localStorage)
          .filter(key => key.startsWith("target>collectable-"))
          .map(key => {
            const type = parseInt(key.replace("target>collectable-", ""), 10);
            return {
              type,
              priority: localStorage.getItem(`priority>collectable-${type}`) ? Number(JSON.parse(localStorage.getItem(`priority>collectable-${type}`))) : 1
            };
          }),
      ],
      minHP: JSON.parse(localStorage.getItem("minHP")) || 10,
      adviceHP: JSON.parse(localStorage.getItem("adviceHP")) || 70,
      kill: {
        targetEngagedNPC: JSON.parse(localStorage.getItem("targetEngagedNPC")) || false,
      },
      admin: {
        enabled: JSON.parse(localStorage.getItem("detectAdmin")) || false,
        delay: JSON.parse(localStorage.getItem("adminDelay")) || 5,
      },
      escape: {
        enabled: JSON.parse(localStorage.getItem("escape")) || false,
        delay: JSON.parse(localStorage.getItem("escapeDelay")) || 20000,
      },
      config: {
        switchConfigOnShieldsDown: JSON.parse(localStorage.getItem("switchConfigOnShieldsDown")) || false,
        attacking: JSON.parse(localStorage.getItem("attacking")) || 1,
        fleeing: JSON.parse(localStorage.getItem("fleeing")) || 2,
        flying: JSON.parse(localStorage.getItem("flying")) || 2,
      },
      enrichment: {
        lasers: { enabled: false, materialType: 0 },
        rockets: { enabled: false, materialType: 0 },
        shields: { enabled: false, materialType: 0 },
        speed: { enabled: false, materialType: 0 },
      },
      autobuy: {
        laser: {
          RLX_1: JSON.parse(localStorage.getItem("autoBuy>RLX_1")) || false,
          GLX_2: JSON.parse(localStorage.getItem("autoBuy>GLX_2")) || false,
          BLX_3: JSON.parse(localStorage.getItem("autoBuy>BLX_3")) || false,
          GLX_2_AS: JSON.parse(localStorage.getItem("autoBuy>GLX_2_AS")) || false,
          MRS_6X: false,
        },
        rockets: {
          KEP_410: JSON.parse(localStorage.getItem("autoBuy>KEP_410")) || false,
          NC_30: JSON.parse(localStorage.getItem("autoBuy>NC_30")) || false,
          TNC_130: JSON.parse(localStorage.getItem("autoBuy>TNC_130")) || false,
        },
        key: {
          enabled: false,
          savePLT: 50000,
        },
      },
      break: {
        interval: 0,
        duration: 0,
      }
    }
  }

  // Initialize the tabs
  document.querySelectorAll("#tabs > div").forEach((tab, index) => {
    if (index === 0) {
      tab.classList.add("bg-zinc-950");
      document.querySelector(`#${tab.id.split("-")[1]}`).classList.remove("hidden");
    }
    tab.addEventListener("click", () => {
      document.querySelectorAll("#content > div").forEach(content => {
        content.classList.add("hidden");
      });
      document.querySelector(`#${tab.id.split("-")[1]}`).classList.remove("hidden");

      document.querySelectorAll("#tabs > div").forEach(tab => {
        tab.classList.remove("bg-zinc-950");
      });
      tab.classList.add("bg-zinc-950");
    });
  });

  // Initialize the NPC table
  const npcList = document.querySelector("tbody#npcList");

  KILLABLE_DATA_TABLE.forEach(npc => {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="mb-2">
              <input
                type="checkbox"
                data-storage-key="target>${npc.storageKey}"
              />
            </td>

            <td class="px-2">
              <input
                type="text"
                class="w-full disabled:bg-gray-600/50"
                disabled
                data-storage-key="name>${npc.storageKey}"
                value="${npc.name}"
              />
            </td>

            <td class="px-2">
              <input
                type="number"
                data-storage-key="priority>${npc.storageKey}"
                placeholder="Priority"
                min="1"
                max="999"
              />
            </td>

            <td class="px-2">
              <select
                data-storage-key="ammo>${npc.storageKey}"
              >
                <option value="1" ${npc.ammo === 1 ? "selected" : ""}>RLX_1</option>
                <option value="2" ${npc.ammo === 2 ? "selected" : ""}>GLX_2</option>
                <option value="3" ${npc.ammo === 3 ? "selected" : ""}>BLX_3</option>
                <option value="4" ${npc.ammo === 4 ? "selected" : ""}>GLX_2_AS</option>
                <option value="5" ${npc.ammo === 5 ? "selected" : ""}>MRS_6X</option>
              </select>
            </td>

            <td class="px-2">
              <select
                data-storage-key="rocket>${npc.storageKey}"
              >
                <option value="1" ${npc.rockets === 1 ? "selected" : ""}>KEP_410</option>
                <option value="2" ${npc.rockets === 2 ? "selected" : ""}>NC_30</option>
                <option value="3" ${npc.rockets === 3 ? "selected" : ""}>TNC_130</option>
              </select>
            </td>`;
    npcList.appendChild(row);
  });

  // Initialize the collectable table
  const collectableList = document.querySelector("tbody#collectableList");

  COLLECTABLE_DATA_TABLE.forEach(collectable => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="mb-2">
              <input
                type="checkbox"
                data-storage-key="target>${collectable.storageKey}"
              />
            </td>

            <td class="px-2">
              <input
                type="text"
                class="w-full disabled:bg-gray-600/50"
                value="${collectable.name}"
                disabled
              />
            </td>

            <td class="px-2">
              <input
                type="number"
                data-storage-key="priority>${collectable.storageKey}"
                placeholder="Priority"
                min="1"
                max="999"
              />
            </td>
  `;
    collectableList.appendChild(row);
  });

  document.querySelectorAll('input[data-storage-key], select[data-storage-key]').forEach(input => {
    input.addEventListener('change', (event) => {
      const key = event.target.getAttribute('data-storage-key');
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      saveToStorage(key, value);
      client.setMode(JSON.parse(localStorage.getItem("mode")) || "collect");
      client.setSettings(adapterSettings());
    });
  });

  function loadFromStorage() {
    const elements = document.querySelectorAll('[data-storage-key]');
    elements.forEach(element => {
      const key = element.getAttribute('data-storage-key');
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        const parsedValue = JSON.parse(savedValue);

        if (element.type === 'checkbox') {
          element.checked = parsedValue;
        } else if (element.tagName === 'SELECT' || element.tagName === 'INPUT') {
          element.value = parsedValue;
        }
      }
    });
  }

  loadFromStorage();

  function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  document.querySelector("#play").addEventListener("click", () => {
    client.setSettings(adapterSettings());
    client.setMode(JSON.parse(localStorage.getItem("mode")) || "collect");
    client.start();
  })

  document.querySelector("#pause").addEventListener("click", () => {
    client.stop();
  })

  // Game rendering
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  canvas.classList.add("overflow-hidden");

  let currentMapWidth = 0;
  let currentMapHeight = 0;

  let playerId = null;

  let scaleX = 1
  let scaleY = 1;

  const scalePosition = ({ x, y }) => ({
    x: Math.round(x * scaleX),
    y: Math.round(y * scaleY),
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

  const drawText = ({ text, x, y, size = 11, opacity = 1, color }) => {
    color ? ctx.fillStyle = color : ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, x, y);
  }

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

  const drawBar = ({ x, y, percentage = 100, height, color = "white", backgroundColor = "gray" }) => {
    const totalWidth = 340;
    const filledWidth = (percentage / 100) * totalWidth;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, totalWidth, height);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, filledWidth, height);
  };

  const drawLine = ({ x1, y1, x2, y2, color = "white", width = 1 }) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
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

  client = new GameClient({
    username: JSON.parse(localStorage.getItem("username")) || "",
    password: JSON.parse(localStorage.getItem("password")) || "",
    serverId: JSON.parse(localStorage.getItem("server")) || "eu1",
  });

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / canvas.width) * currentMapWidth;
    const y = ((event.clientY - rect.top) / canvas.height) * currentMapHeight;
    client.scene.move(x, y);
  });

  const render = () => {
    if (!client.client.clientLoaded) return requestAnimationFrame(render);
    if (!client.scene.playerId) return requestAnimationFrame(render);
    playerId = client.scene.playerId
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentMapWidth = client.scene.currentMapWidth || currentMapWidth;
    currentMapHeight = client.scene.currentMapHeight || currentMapHeight;

    scaleX = canvas.width / currentMapWidth;
    scaleY = canvas.height / currentMapHeight;

    drawText({
      text: client.stats.messageState,
      x: canvas.width / 2 - ctx.measureText(client.stats.messageState).width / 2,
      y: 10
    });

    // Status top left
    drawText({ text: `Status: ${client.status}`, x: 10, y: 20 });
    drawText({ text: `Server: ${client.client.serverId.toUpperCase()}`, x: 10, y: 35 });

    // Name of the map (Middle - screen)
    drawText({ text: client.scene.currentMap, x: canvas.width / 2 - 50, y: canvas.height / 2, size: 50, opacity: 0.2 });

    // Static elements
    const player = client.scene.ships[playerId];
    const selected = player?.selected;

    drawBar({
      x: 10,
      y: canvas.height - 35,
      height: 12,
      color: "green",
      percentage: (player?.health / player?.maxHealth) * 100
    });
    drawBar({
      x: 10, y: canvas.height - 20, height: 12, color: "blue",
      percentage: (player?.shield / player?.maxShield) * 100
    });

    drawText({ text: `${player?.health} / ${player?.maxHealth}`, x: 20, y: canvas.height - 25 });
    drawText({ text: `${player?.shield} / ${player?.maxShield}`, x: 20, y: canvas.height - 10 });

    if (selected) {
      const npc = client.scene.ships[selected];
      if (npc) {
        const barX = 435;
        const barY = canvas.height - 35;
        const textX = 445;

        drawBar({ x: barX, y: barY, height: 12, color: "green", percentage: (npc.health / npc.maxHealth) * 100 });
        drawBar({ x: barX, y: barY + 15, height: 12, color: "blue", percentage: (npc.shield / npc.maxShield) * 100 });

        drawText({ text: `${npc.health} / ${npc.maxHealth}`, x: textX, y: barY + 10 });
        drawText({ text: `${npc.shield} / ${npc.maxShield}`, x: textX, y: barY + 25 });

        drawText({
          text: npc.name,
          x: 580 - ctx.measureText(npc.name).width / 2,
          y: canvas.height - 45,
          color: "red",
          size: 18,
        });
      }
    }

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
    Object.values(client.scene.collectibles).forEach(pos => drawCollectable({
      x: pos.x,
      y: pos.y,
      type: pos.type
    }));

    // Ships
    const ownCorporation = Object.values(client.scene.ships).find((ship) => ship.id === playerId)?.corporation;
    Object.values(client.scene.ships).forEach((ship) => {
      const pos = scalePosition({ x: ship.x, y: ship.y });

      if (ship.id === playerId) {
        drawPlayer({ x: ship.x, y: ship.y, cross: true });
        drawText({
          x: 120,
          y: 555,
          text: ship.name,
          color: "white",
          size: 18
        })
      } else if (ship.corporation === ownCorporation) {
        drawPlayer({ x: ship.x, y: ship.y, color: "blue" });
        drawText({
          text: ship.name,
          x: pos.x - ctx.measureText(ship.name).width / 2,
          y: pos.y - 10,
          color: "blue",
          size: 10
        });
      } else if (ship.corporation === CORPORATIONS_TYPES.NONE) {
        drawEnemy({ x: ship.x, y: ship.y });
        drawText({
          text: ship.name,
          x: pos.x - ctx.measureText(ship.name).width / 2,
          y: pos.y - 10,
          color: "red",
          size: 8
        });
      } else {
        drawPlayer({ x: ship.x, y: ship.y, color: "orange", width: 10, height: 10 });
        drawText({
          text: ship.name,
          x: pos.x - ctx.measureText(ship.name).width / 2,
          y: pos.y - 10,
          color: "orange",
          size: 10
        });
      }
    });

    // Path line
    if (client.scene?.isMoving) {
      const posPlayer = scalePosition({ x: player.x, y: player.y });
      const posFinal = scalePosition({ x: client.scene.targetx, y: client.scene.targety });
      drawLine({
        x1: posPlayer.x + 4,
        y1: posPlayer.y + 4,
        x2: posFinal.x + 4,
        y2: posFinal.y + 4,
        color: "rgba(255,255,255,0.68)",
        width: 1
      });
    }

    // Stats
    const { pltPerHour, hnrPerHour, expPerHour, creditsPerHour } = client.stats.getStats();

    drawText({ text: "BTC:", x: 10, y: 250, })
    drawText({
      text: `${client.user.credits.toLocaleString()} (${creditsPerHour.toLocaleString()}/h)`,
      x: 50,
      y: 250,
    })

    drawText({ text: "PLT:", x: 10, y: 265, })
    drawText({ text: `${client.user.plt.toLocaleString()} (${pltPerHour.toLocaleString()}/h)`, x: 50, y: 265, })

    drawText({ text: "HNR:", x: 10, y: 280, })
    drawText({ text: `${client.user.honor.toLocaleString()} (${hnrPerHour.toLocaleString()}/h)`, x: 50, y: 280, })

    drawText({ text: "EXP:", x: 10, y: 295, })
    drawText({
      text: `${client.user.experience.toLocaleString()} (${expPerHour.toLocaleString()}/h)`,
      x: 50,
      y: 295,
    })

    drawText({ text: "Deaths:", x: 10, y: 310, })
    drawText({ text: client.stats.deaths.toLocaleString(), x: 50, y: 310, })

    requestAnimationFrame(render);
  }

  render();
});



