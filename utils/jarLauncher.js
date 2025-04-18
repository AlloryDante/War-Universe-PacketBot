const { spawn } = require("child_process");
const path = require("path");

module.exports = function launchJAR(ip, port) {
  // Construct the path to the JAR file relative to the current directory
  const jarPath = path.join(__dirname, "..", "wupacket", "target", "wupacket-1.0-SNAPSHOT.jar");

  // Launch the JAR file with command-line arguments
  const javaProcess = spawn("java", ["-jar", jarPath, ip, port]);

  javaProcess.stdout.on("data", (data) => {
    console.log(`Java stdout: ${data}`);
  });

  javaProcess.stderr.on("data", (data) => {
    console.error(`Java stderr: ${data}`);
  });

  javaProcess.on("close", (code) => {
    console.log(`Java process exited with code ${code}`);
  });
};
