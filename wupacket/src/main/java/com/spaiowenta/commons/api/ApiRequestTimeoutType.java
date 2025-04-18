package com.spaiowenta.commons.api;

public enum ApiRequestTimeoutType {
  SHORT(1000),
  MEDIUM(5000),
  LONG(20000);
  
  private final int timeoutMs;
  
  ApiRequestTimeoutType(int paramInt1) {
    this.timeoutMs = paramInt1;
  }
  
  public int getTimeoutMs() {
    return this.timeoutMs;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiRequestTimeoutType.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */