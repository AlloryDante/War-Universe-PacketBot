//PROBABLY YOU WONT USE THIS, YOU CAN REMOVE IT. THIS IS FOR API SERVER FUNCTIONALITY

const express = require("express");
const router = express.Router();
const User = require("../database/User");
const { authMiddleware, validateTokenParam } = require("../middleware/auth");
const { decrypt } = require("../database/encryption");

router.post("/start/:username", authMiddleware, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      "discordId": req.user.discordId,
      "accounts.username": username,
    });

    if (!user) {
      return res.status(404).json({ error: "Account not found" });
    }

    const account = user.accounts.find((acc) => acc.username === username);

    await req.botManager.startBot(account.username, decrypt(account.password), account.settings, user.discordId);

    res.json({
      success: true,
      message: `Bot started for ${username}`,
    });
  } catch (error) {
    console.error(`Error starting bot for ${username}:`, error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/stop/:username", authMiddleware, async (req, res) => {
  const { username } = req.params;

  try {
    console.log(`API:Stopping bot for ${username}`);
    await req.botManager.stopBot(username);
    res.json({
      success: true,
      message: `Bot stopped for ${username}`,
    });
  } catch (error) {
    console.error(`Error stopping bot for ${username}:`, error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/running", authMiddleware, async (req, res) => {
  try {
    const runningBots = req.botManager.getRunningBots();
    const userAccounts = req.user.accounts.map((acc) => acc.username);
    const userRunningBots = runningBots.filter((bot) => userAccounts.includes(bot));

    res.json({
      success: true,
      bots: userRunningBots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/stats/:username", validateTokenParam, (req, res) => {
  const { username } = req.params;

  // Verify user has access to this bot
  const userAccount = req.user.accounts.find((acc) => acc.username === username);
  if (!userAccount) {
    return res.status(403).json({ error: "You don't have access to this bot" });
  }

  const worker = req.botManager.activeClients.get(username);
  if (!worker) {
    return res.status(404).json({ error: "Bot not running for this username" });
  }

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendStats = (stats) => {
    res.write(`data: ${JSON.stringify(stats)}\n\n`);
  };

  const handleMessage = (message) => {
    if (message.type === "STATS") {
      sendStats(message.stats);
    } else if (message.type === "DISCONNECTED") {
      // Send disconnection event to client
      res.write(`data: ${JSON.stringify({ type: "DISCONNECTED" })}\n\n`);
      // Close the SSE connection
      res.end();
      // Remove event listener to prevent memory leaks
      worker.off("message", handleMessage);
    }
  };

  worker.on("message", handleMessage);

  // Start sending stats updates
  worker.postMessage({ type: "START_STATS" });

  // Clean up when the client disconnects
  req.on("close", () => {
    worker.off("message", handleMessage);
    worker.postMessage({ type: "STOP_STATS" });
    res.end();
  });
});

module.exports = router;
