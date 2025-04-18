package com.spaiowenta.commons.api.missions;

public class MissionsMinerActivationRequest {
  private final int mission;
  
  private final int spins;
  
  public int getMission() {
    return this.mission;
  }
  
  public int getSpins() {
    return this.spins;
  }
  
  public MissionsMinerActivationRequest(int paramInt1, int paramInt2) {
    this.mission = paramInt1;
    this.spins = paramInt2;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\missions\MissionsMinerActivationRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */