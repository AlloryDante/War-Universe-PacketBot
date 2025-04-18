package com.spaiowenta.commons.api.missions;

import java.util.HashMap;
import java.util.Map;

public class MissionsMinerActivationResponse {
  private Map<Integer, Integer> ptReward = new HashMap<>();
  
  private int hpReward = 0;
  
  private Map<String, Integer> kindRewards = new HashMap<>();
  
  public Map<Integer, Integer> getPtReward() {
    return this.ptReward;
  }
  
  public int getHpReward() {
    return this.hpReward;
  }
  
  public Map<String, Integer> getKindRewards() {
    return this.kindRewards;
  }
  
  public void setPtReward(Map<Integer, Integer> paramMap) {
    this.ptReward = paramMap;
  }
  
  public void setHpReward(int paramInt) {
    this.hpReward = paramInt;
  }
  
  public void setKindRewards(Map<String, Integer> paramMap) {
    this.kindRewards = paramMap;
  }
  
  public MissionsMinerActivationResponse(Map<Integer, Integer> paramMap, int paramInt, Map<String, Integer> paramMap1) {
    this.ptReward = paramMap;
    this.hpReward = paramInt;
    this.kindRewards = paramMap1;
  }
  
  public MissionsMinerActivationResponse() {}
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\missions\MissionsMinerActivationResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */