package com.spaiowenta.commons.packets.equip;

public class LaserAmmo extends Ammo {
  public static final int LASER_RED = 1;
  
  public static final int LASER_GREEN = 2;
  
  public static final int LASER_BLUE = 3;
  
  public static final int LASER_WHITE = 4;
  
  public static final int LASER_ASHIELD = 5;
  
  public static final int LASER_MRS = 6;
  
  public int multi;
  
  public LaserAmmo() {
    super(1);
  }
  
  public LaserAmmo(int paramInt) {
    super(1);
    this.subtype = paramInt;
    if (paramInt == 1) {
      this.price = 100;
      this.multi = 1;
    } else if (paramInt == 2) {
      this.price = 4000;
      this.multi = 2;
    } else {
      this.elite = true;
      if (paramInt == 3) {
        this.price = 10;
        this.multi = 3;
      } else if (paramInt == 4) {
        this.price = 1000;
        this.multi = 4;
      } else if (paramInt == 5) {
        this.price = 10;
        this.multi = 3;
      } else if (paramInt == 6) {
        this.price = 50;
        this.multi = 6;
      } else {
        this.price = 10;
        this.multi = 1;
      } 
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\LaserAmmo.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */