package com.spaiowenta.commons.packets;

import java.util.Arrays;

public class Reward {
  static int n = 0;
  
  public static final int btc = n++;
  
  public static final int plt = n++;
  
  public static final int exp = n++;
  
  public static final int hnr = n++;
  
  public static final int lammo = n++;
  
  public static final int eammo = n++;
  
  public static final int rammo = n++;
  
  public static final int miner_ticket = n++;
  
  public static final int premium = n++;
  
  public static final int GUN = n++;
  
  public static final int SHIELDGEN = n++;
  
  public static final int SPEEDGEN = n++;
  
  public static final int DRONE_COVER = n++;
  
  public static final int EXTENSION = n++;
  
  public static final int DRONE = n++;
  
  public static final int GOLD = n++;
  
  RewardItem[] items;
  
  public void addReward(RewardItem paramRewardItem) {
    addReward(paramRewardItem.type, paramRewardItem.subtype, paramRewardItem.amount);
  }
  
  public void addReward(int paramInt1, int paramInt2) {
    addReward(paramInt1, 0, paramInt2);
  }
  
  public void addReward(int paramInt1, int paramInt2, int paramInt3) {
    if (paramInt3 == 0)
      return; 
    if (this.items == null) {
      this.items = new RewardItem[1];
    } else {
      this.items = Arrays.<RewardItem>copyOf(this.items, this.items.length + 1);
    } 
    RewardItem rewardItem = new RewardItem();
    rewardItem.type = paramInt1;
    rewardItem.subtype = paramInt2;
    rewardItem.amount = paramInt3;
    this.items[this.items.length - 1] = rewardItem;
  }
  
  public RewardItem[] getItems() {
    return this.items;
  }
  
  public RewardItem getItem(int paramInt) {
    return getItem(paramInt, 0);
  }
  
  public RewardItem getItem(int paramInt1, int paramInt2) {
    if (this.items == null)
      return null; 
    for (RewardItem rewardItem : getItems()) {
      if (rewardItem.type == paramInt1 && rewardItem.subtype == paramInt2)
        return rewardItem; 
    } 
    return null;
  }
  
  public void multiply(int paramInt, float paramFloat) {
    multiply(paramInt, 0, paramFloat);
  }
  
  public void multiply(int paramInt1, int paramInt2, float paramFloat) {
    RewardItem rewardItem = getItem(paramInt1, paramInt2);
    if (rewardItem != null)
      rewardItem.amount = (int)(rewardItem.amount * paramFloat); 
  }
  
  public Reward multiply(float paramFloat) {
    for (RewardItem rewardItem : getItems())
      rewardItem.amount = (int)(rewardItem.amount * paramFloat); 
    return this;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\Reward.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */