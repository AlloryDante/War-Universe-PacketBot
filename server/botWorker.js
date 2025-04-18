//PROBABLY YOU WONT USE THIS, YOU CAN REMOVE IT. THIS IS FOR API SERVER FUNCTIONALITY

const { parentPort } = require("worker_threads");
const Client = require("../modules/GameClient");

let client = null;
let statsInterval = null;

parentPort.on("message", async (message) => {
  try {
    switch (message.type) {
      case "START":
        try {
          client = new Client({ username: message.username, password: message.password, serverId: message.settings?.server || "eu1", discordId: message.discordId });
          client.setSettings(message.settings);
          if (!message.settings?.task) throw new Error("Task not set");
          client.setMode(message.settings.task);

          client.client.on("disconnected", () => {
            console.log("Client disconnected, terminating worker");
            parentPort.postMessage({ type: "DISCONNECTED" });
            process.exit(0);
          });

          await client.start();
          parentPort.postMessage({ type: "STATUS", success: true });
        } catch (error) {
          parentPort.postMessage({
            type: "STATUS",
            success: false,
            error: error.message,
          });
          process.exit(0);
        }
        break;

      case "STOP":
        try {
          if (!client) {
            throw new Error("No active client to stop");
          }

          //await client.disconnect();
          client = null;
          parentPort.postMessage({ type: "STOPPED" });
        } catch (error) {
          parentPort.postMessage({
            type: "ERROR",
            error: error.message || "Failed to stop client",
          });

          // Force cleanup in case of error
          client = null;
        }
        break;

      case "GET_STATS":
        if (client) {
          const stats = client.stats.getStats();
          parentPort.postMessage({ type: "STATS", stats });
        } else {
          parentPort.postMessage({ type: "ERROR", error: "Client not initialized" });
        }
        break;

      default:
        throw new Error(`Unknown message type: ${message.type}`);
    }
  } catch (error) {
    parentPort.postMessage({
      type: "ERROR",
      error: error.message,
    });
  }
});

// Periodically send stats
if (!statsInterval) {
  statsInterval = setInterval(() => {
    if (client) {
      const stats = client.stats.getStats();
      parentPort.postMessage({ type: "STATS", stats });
    }
  }, 500); // Adjust the interval as needed
}

// Handle worker shutdown
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  parentPort.postMessage({
    type: "ERROR",
    error: error.message,
  });
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  parentPort.postMessage({
    type: "ERROR",
    error: error.message,
  });
});
