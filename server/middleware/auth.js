//PROBABLY YOU WONT USE THIS, YOU CAN REMOVE IT. THIS IS FOR API SERVER FUNCTIONALITY

const jwt = require("jsonwebtoken");
const User = require("../database/User");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.discordId) {
      return res.status(401).json({ error: "API ERROR CLEAR LOCALSTORAGE" });
    }

    const user = await User.findOne({ discordId: decoded.discordId });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// New middleware for validating token from query parameter
const validateTokenParam = async (req, res, next) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.discordId) {
      return res.status(401).json({ error: "API2 ERROR CLEAR LOCALSTORAGE" });
    }

    const user = await User.findOne({ discordId: decoded.discordId });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { authMiddleware, validateTokenParam };
