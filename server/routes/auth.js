//PROBABLY YOU WONT USE THIS, YOU CAN REMOVE IT. THIS IS FOR API SERVER FUNCTIONALITY

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../database/User");

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const PORT = process.env.PORT || 4646;
const API_URL = process.platform === "win32" ? `http://localhost:${PORT}` : "https://api.warangelbot.com";
const FRONTEND_URL = process.platform === "win32" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_PRODUCTION;
const JWT_SECRET = process.env.JWT_SECRET;
const DISCORD_REDIRECT_URI = `${API_URL}/api/auth/callback`;

router.get("/url", (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  res.json({
    url: `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify&state=${state}`,
  });
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokens = await tokenRes.json();

    // Get user info from Discord
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const discordUser = await userRes.json();

    if (!discordUser.id) throw new Error("No discord id, login failed...");

    // Create or update user in database
    const user = await User.findOneAndUpdate(
      { discordId: discordUser.id },
      {
        discordId: discordUser.id,
        username: discordUser.username,
        avatar: discordUser.avatar,
        lastLogin: new Date(),
      },
      { upsert: true, new: true }
    );

    // Create JWT token
    const token = jwt.sign(
      {
        discordId: user.discordId,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.log(error);
    res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
  }
});

router.get("/check", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ authenticated: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ discordId: decoded.discordId });

    if (!user) {
      return res.json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        discordId: user.discordId,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.json({ authenticated: false });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("discord_id");
  res.json({ success: true });
});

module.exports = router;
