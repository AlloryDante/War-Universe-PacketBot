package com.spaiowenta.commons.packets.equip;

public class EnergyAmmo extends Ammo {
  public static final int ELECTRIC_ENERGY = 1;
  
  public static final int NUCLEAR_ENERGY = 2;
  
  public static final int MAGNETIC_ENERGY = 3;
  
  public static final int GRAVITY_ENERGY = 4;
  
  public EnergyAmmo() {
    super(1);
  }
  
  public EnergyAmmo(int paramInt) {
    super(3);
    this.subtype = paramInt;
    this.elite = true;
    if (paramInt == 1) {
      this.price = 50;
    } else if (paramInt == 2) {
      this.price = 250;
    } else if (paramInt == 3) {
      this.price = 150;
    } else if (paramInt == 4) {
      this.price = 200;
    } else {
      this.price = 50;
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\EnergyAmmo.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */