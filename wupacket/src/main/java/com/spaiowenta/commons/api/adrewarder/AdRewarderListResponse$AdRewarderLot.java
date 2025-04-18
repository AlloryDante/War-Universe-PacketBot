package com.spaiowenta.commons.api.adrewarder;

public class AdRewarderListResponse$AdRewarderLot {
  private final AdRewardType adRewardType;
  
  private final int remainingOffersCount;
  
  private final long delaySeconds;
  
  public AdRewardType getAdRewardType() {
    return this.adRewardType;
  }
  
  public int getRemainingOffersCount() {
    return this.remainingOffersCount;
  }
  
  public long getDelaySeconds() {
    return this.delaySeconds;
  }
  
  public AdRewarderListResponse$AdRewarderLot(AdRewardType paramAdRewardType, int paramInt, long paramLong) {
    this.adRewardType = paramAdRewardType;
    this.remainingOffersCount = paramInt;
    this.delaySeconds = paramLong;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\adrewarder\AdRewarderListResponse$AdRewarderLot.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */