//PROBABLY YOU WONT USE THIS, YOU CAN REMOVE IT. THIS IS FOR API SERVER FUNCTIONALITY

const { Worker } = require("worker_threads");
const path = require("path");

class BotManager {
  constructor() {
    this.activeClients = new Map(); // username -> worker
  }

  async startBot(username, password, settings, discordId) {
    if (this.activeClients.has(username)) {
      throw new Error("Bot already running for this username");
    }

    const worker = new Worker(path.join(__dirname, "botWorker.js"));

    return new Promise((resolve, reject) => {
      worker.postMessage({
        type: "START",
        username,
        password,
        settings,
        discordId,
      });

      this.activeClients.set(username, worker);

      worker.on("message", (message) => {
        if (message.type === "STATUS") {
          if (message.success) {
            resolve();
          } else {
            reject(new Error(message.error || "Unknown error"));
          }
        } else if (message.type === "DISCONNECTED") {
          this.stopBot(username);
        }
      });

      worker.on("error", (error) => {
        console.error(`Bot ${username} error:`, error);
        this.activeClients.delete(username);
        reject(error);
      });

      worker.on("exit", (code) => {
        console.log(`Bot ${username} exited with code ${code}`);
        this.activeClients.delete(username);
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  async stopBot(username) {
    const worker = this.activeClients.get(username);
    if (!worker) {
      throw new Error(`No running bot found for username: ${username}`);
    }
    worker.terminate();
    this.activeClients.delete(username);
    console.log(`Worker terminated for ${username}`);
  }

  getRunningBots() {
    return Array.from(this.activeClients.keys());
  }
}

module.exports = BotManager;
