const crypto = require("crypto");
//Masks your device id

module.exports = function generateUUIDFromString(inputString) {
  // Create a SHA-256 hash of the input string
  const hash = crypto.createHash("sha256").update(inputString).digest("hex");

  // Convert the first 16 bytes of the hash to a UUID format
  const uuid = [hash.slice(0, 8), hash.slice(8, 12), hash.slice(12, 16), hash.slice(16, 20), hash.slice(20, 32)].join("-");

  return uuid;
};
