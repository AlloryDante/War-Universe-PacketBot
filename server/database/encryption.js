const crypto = require("crypto");

// Generate a random 32-byte encryption key
const encryptionKey = Buffer.from("82bb81ade21e48bbf2ed4e410aab36494a95e2e985485f645511328c261ddef0", "hex");

// Function to encrypt data
function encrypt(plaintext) {
  const iv = crypto.randomBytes(16); // Generate a new Initialization Vector (IV) for each encryption
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

// Function to decrypt data
function decrypt(ciphertext) {
  const [ivHex, encrypted] = ciphertext.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
