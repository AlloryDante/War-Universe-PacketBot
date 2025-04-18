module.exports = class boolManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }
  enabled(boolean) {
    if (!this.stateManager.boolTriggers[boolean]) {
      this.stateManager.boolTriggers[boolean] = true;
      return false;
    }
    return true;
  }
  disabled(boolean) {
    if (this.stateManager.boolTriggers[boolean]) {
      this.stateManager.boolTriggers[boolean] = false;
      return false;
    }
    return true;
  }
};
