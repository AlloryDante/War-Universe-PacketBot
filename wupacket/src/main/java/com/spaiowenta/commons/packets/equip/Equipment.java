package com.spaiowenta.commons.packets.equip;

public class Equipment {
  public static final int LASER = 1;
  
  public static final int SPEEDGEN = 2;
  
  public static final int SHIELDGEN = 3;
  
  public static final int EXTENSION = 4;
  
  public static final int DRONE_COVER = 5;
  
  public int subtype;
  
  public int type = 0;
  
  public int id;
  
  public int price;
  
  public int sellPrice;
  
  public boolean elite;
  
  public Equipment() {}
  
  public Equipment(int paramInt) {}
  
  public String toString() {
    return "Equipment{id=" + this.id + ", type=" + this.type + ", subtype=" + this.subtype + '}';
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\Equipment.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */