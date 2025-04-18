package com.spaiowenta.commons.packets.equip;

public class DroneCover extends Equipment {
  public static final int COVER_1 = 1;
  
  public static final int COVER_2 = 2;
  
  public static final int COVER_3 = 3;
  
  @Deprecated
  int damageBoost;
  
  @Deprecated
  int shieldBoost;
  
  public DroneCover() {}
  
  public DroneCover(int paramInt) {
    super(5);
    this.subtype = paramInt;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\DroneCover.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */