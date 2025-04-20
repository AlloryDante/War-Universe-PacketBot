# 🚀 WARANGEL - War Universe Game Bot

<div align="center">
  <img src="https://warangelbot.com/logo.png" alt="Wupacket Logo" width="300">
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/wupacket)
</div>

## 🌌 Overview

Wupacket is a sophisticated automation bot for War Universe, providing advanced functionality for combat, resource collection, and survival. Built with performance and customization in mind, this bot offers an extensive range of features to enhance your gameplay experience.

## ✨ Features

### 🛡️ Combat System

- **Intelligent Target Selection**: Prioritize enemies based on custom criteria
- **Weapon Management**: Automatic ammunition and rocket usage optimization
- **Combat Tactics**: Farm near portals or engage in open space based on configuration

### 📦 Resource Collection

- **Box Collection**: Target specific box types with custom priority levels
- **Resource Optimization**: Efficient pathfinding for resource gathering

### 🔄 Auto-Enhancement

- **Equipment Enrichment**: Auto-enhance lasers, rockets, shields, and speed
- **Material Management**: Specify material types and minimum amounts

#### Enrichment Material IDs

##### Laser Enrichment Materials

- `0`: Disabled
- `4`: Darkonit
- `5`: Uranit
- `7`: Dungid

##### Generator Enrichment Materials

- `0`: Disabled
- `5`: Uranit
- `6`: Azurit
- `8`: Xureon

### 🛒 Auto-Buying

- **Equipment Purchasing**: Automatically purchase lasers, rockets, and keys
- **Currency Management**: Save specific amounts of PLT

### 🛡️ Survival Mechanisms

- **Health Management**: Configure minimum and advised HP levels
- **Escape System**: Automatic escape when in danger
- **Config Switching**: Change configurations dynamically based on shield status

### 👮 Admin Detection

- **Administrator Avoidance**: Detect and avoid game administrators
- **Safety Protocols**: Implement delays and evasion tactics

### ⏰ Anti-Ban Features

- **Break Scheduling**: Configure work/break intervals
- **Behavior Randomization**: Mimic human-like gameplay patterns

## 🔧 Configuration

The bot offers extensive configuration options:

```javascript
client.setSettings({
  workMap: "R-6", // Target map to work on
  killTargets: [
    // Enemy targets with priority
    { name: "-=(Hydro)=-", priority: 1, ammo: 1, rockets: 1, farmNearPortal: false },
    { name: "-=(Hyper|Hidro)=-", priority: 2, ammo: 1, rockets: 1, farmNearPortal: false },
    // More targets...
  ],
  collectBoxTypes: [
    // Box types to collect
    { type: 3, priority: 10 },
    { type: 1, priority: 1 },
  ],
  minHP: 10, // Minimum health percentage
  adviceHP: 70, // Advised health percentage
  kill: {
    targetEngagedNPC: true, // Whether to target already engaged NPCs
  },
  escape: {
    enabled: true, // Enable escape mechanism
    delay: 20000, // Delay before escape
  },
  config: {
    switchConfigOnShieldsDown: true, // Switch config when shields are down
    attacking: 1, // Config for attacking
    fleeing: 2, // Config for fleeing
    flying: 2, // Config for flying
  },
  enrichment: {
    lasers: { enabled: true, materialType: 0 },
    rockets: { enabled: true, materialType: 0 },
    shields: { enabled: true, materialType: 0, amount: 10, minAmount: 10 },
    speed: { enabled: true, materialType: 0, amount: 10, minAmount: 10 },
  },
  autobuy: {
    laser: {
      RLX_1: true,
      GLX_2: true,
      BLX_3: true,
      GLX_2_AS: true,
      MRS_6X: true,
    },
    rockets: {
      KEP_410: true,
      NC_30: true,
      TNC_130: true,
    },
    key: {
      enabled: true,
      savePLT: 50000, // Amount of PLT to save
    },
  },
  break: {
    interval: 3600000, // Break interval (1 hour)
    duration: 300000, // Break duration (5 minutes)
  },
  admin: {
    enabled: true, // Enable admin detection
    delay: 5, // Delay for admin detection processing
  },
});
```

## 🕹️ Modes

The bot supports multiple operation modes:

- **Kill Mode**: Focus solely on combat and enemy elimination
- **Collect Mode**: Focus solely on resource collection
- **KillCollect Mode**: Balance between combat and collection
- **Follow Mode**: Follow a specific player

```javascript
client.setMode("kill"); // Options: "follow", "kill", "collect", "killcollect"
```

## 🚀 Getting Started

### Prerequisites

- Node.js latest version
- A valid War Universe account
- Java JDK 22 or higher https://download.oracle.com/java/22/archive/jdk-22.0.2_windows-x64_bin.exe
- Make sure to uninstall all other java installs and when you open cmd and write `java - version` you get something over v22.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AlloryDante/War-Universe-PacketBot.git
cd War-Universe-PacketBot
```

2. (OPTIONAL - Really not required unless you dev the client! )Compile the Java client emulator:

```bash
cd wupacket
mvn clean verify
```

3. Install dependencies:

```bash
npm install
```

4. Configure your account in `main.js`. Don't forget to also edit the settings:

```javascript
const client = new Client({
  username: "your_username", //Your account username here
  password: "your_password", //Your account password
  serverId: "eu1", //or tr1, na1 I think test1 also work for test server
});
```

5. (OPTIONAL) Update the client version and MD5 hash in `modules/general/netClient.js` :

```javascript
this.clientVersion = [1, 233, 0]; // Update with current game version
this.clientMD5 = "269980fe6e943c59e8ff10338f719870"; // Calculate using https://emn178.github.io/online-tools/md5_checksum.html
```

6. Start the bot:

```bash
node main.js
```

## ⌨️ Manual Controls

The bot supports manual control via console commands:

- Press `h` to return to home coordinates
- Press `Enter` to target a specific ship - you must edit the id inside the scripts

## ⚠️ Disclaimer

This bot is for educational purposes only. Use at your own risk. The developers are not responsible for any consequences resulting from the use of this software, including but not limited to account bans or suspensions.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by Allory Dante</sub>
</div>
