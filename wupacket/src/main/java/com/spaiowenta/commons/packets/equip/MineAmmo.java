package com.spaiowenta.commons.packets.equip;

public class MineAmmo extends Ammo {
  public static final int TYPE_1 = 1;
  
  public static final int TYPE_2 = 2;
  
  public static final int TYPE_3 = 3;
  
  public int damage;
  
  public int distance;
  
  public MineAmmo() {
    super(4);
  }
  
  public MineAmmo(int paramInt) {
    super(4);
    this.subtype = paramInt;
    if (paramInt == 1) {
      this.price = 100;
      this.distance = 500;
      this.damage = 6000;
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\MineAmmo.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */