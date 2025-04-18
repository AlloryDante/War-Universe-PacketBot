//This file was create to use as a server controller so u can host the bot for multiple people on a vps.
//Probably you can remove the server functionality if you just want a gameclient in order to cleanup the code

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const BotManager = require("./server/botManager");

const authRoutes = require("./server/routes/auth");
const accountRoutes = require("./server/routes/accounts");
const botRoutes = require("./server/routes/bot");

const app = express();
const FRONTEND_URL = process.platform === "win32" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_PRODUCTION;

const botManager = new BotManager();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Add botManager to request object
app.use((req, res, next) => {
  req.botManager = botManager;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/bot", botRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
