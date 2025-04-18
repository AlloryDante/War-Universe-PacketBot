//PROBABLY YOU WONT USE THIS, YOU CAN REMOVE IT. THIS IS FOR API SERVER FUNCTIONALITY

const express = require("express");
const router = express.Router();
const Client = require("../../modules/general/netClient");
const { encrypt, decrypt } = require("../database/encryption");

const User = require("../database/User");
const { authMiddleware } = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findOne({ discordId: req.user.discordId });

  const safeAccounts =
    user?.accounts.map((acc) => ({
      username: acc.username,
      settings: acc.settings,
    })) || [];

  res.json(safeAccounts);
});

router.post("/", authMiddleware, async (req, res) => {
  const { username, password, settings } = req.body;

  await User.findOneAndUpdate({ discordId: req.user.discordId }, { $push: { accounts: { username, password: encrypt(password), settings } } }, { upsert: true });

  res.json({ success: true });
});

router.get("/:username/settings", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      "discordId": req.user.discordId,
      "accounts.username": username,
    });

    const account = user.accounts.find((acc) => acc.username === username);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(account.settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.put("/:username/settings", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const { settings } = req.body;

    const result = await User.findOneAndUpdate(
      {
        "discordId": req.user.discordId,
        "accounts.username": username,
      },
      {
        $set: {
          "accounts.$.settings": settings,
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
});

router.post("/test-account", authMiddleware, async (req, res) => {
  const { username, password, serverId = "eu1" } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username and password are required",
    });
  }

  try {
    // Create a temporary client to test credentials
    const testClient = new Client(username, password, serverId);

    // We only need to fetch meta info and attempt login
    await testClient.fetchMetaInfo();
    const token = await testClient.login(username, password);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // If we got here, the credentials are valid
    res.json({
      success: true,
      message: "Account credentials are valid",
    });
  } catch (error) {
    console.error("Account test failed:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to validate account",
    });
  }
});

router.get("/delete/:username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;

    // First check if bot is running and stop it if it is
    if (req.botManager.activeClients.has(username)) {
      await req.botManager.stopBot(username);
    }

    // Remove the account from the user's accounts array
    const result = await User.findOneAndUpdate({ discordId: req.user.discordId }, { $pull: { accounts: { username: username } } }, { new: true });

    if (!result) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({
      success: true,
      message: `Account ${username} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting account ${req.params.username}:`, error);
    res.status(500).json({
      success: false,
      error: "Failed to delete account",
    });
  }
});

module.exports = router;
