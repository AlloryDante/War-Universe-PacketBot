package com.spaiowenta.commons.packets.equip;

public class RocketAmmo extends Ammo {
  public static final int TYPE_1 = 1;
  
  public static final int TYPE_2 = 2;
  
  public static final int TYPE_3 = 3;
  
  public int distance;
  
  public int damage;
  
  public int speed = 1000;
  
  public RocketAmmo() {
    super(2);
  }
  
  public RocketAmmo(int paramInt) {
    super(2);
    this.subtype = paramInt;
    if (paramInt == 1) {
      this.price = 100;
      this.distance = 600;
      this.damage = 1000;
    } else if (paramInt == 2) {
      this.price = 500;
      this.distance = 700;
      this.damage = 2000;
    } else if (paramInt == 3) {
      this.elite = true;
      this.price = 5;
      this.distance = 800;
      this.damage = 4000;
    } else {
      this.price = 100;
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\RocketAmmo.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */