const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  settings: mongoose.Schema.Types.Mixed,
});

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  lastLogin: { type: Date, required: false },
  avatar: { type: String, required: false },
  accounts: [accountSchema],
});
//
module.exports = mongoose.model("User", userSchema);
