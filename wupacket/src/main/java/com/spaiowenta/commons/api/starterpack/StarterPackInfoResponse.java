package com.spaiowenta.commons.api.starterpack;

public class StarterPackInfoResponse {
  private final boolean active;
  
  private final int timerSeconds;
  
  private final boolean notify;
  
  public boolean isActive() {
    return this.active;
  }
  
  public int getTimerSeconds() {
    return this.timerSeconds;
  }
  
  public boolean isNotify() {
    return this.notify;
  }
  
  public StarterPackInfoResponse(boolean paramBoolean1, int paramInt, boolean paramBoolean2) {
    this.active = paramBoolean1;
    this.timerSeconds = paramInt;
    this.notify = paramBoolean2;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\starterpack\StarterPackInfoResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */