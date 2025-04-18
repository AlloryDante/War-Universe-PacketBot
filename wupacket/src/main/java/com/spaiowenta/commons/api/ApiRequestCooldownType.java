package com.spaiowenta.commons.api;

public enum ApiRequestCooldownType {
  SHORT(100),
  MEDIUM(1000),
  LONG(5000);
  
  private final int cooldownTimeMs;
  
  ApiRequestCooldownType(int paramInt1) {
    this.cooldownTimeMs = paramInt1;
  }
  
  public int getCooldownTimeMs() {
    return this.cooldownTimeMs;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiRequestCooldownType.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */