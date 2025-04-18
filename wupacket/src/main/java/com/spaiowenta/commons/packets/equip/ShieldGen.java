package com.spaiowenta.commons.packets.equip;

public class ShieldGen extends Equipment {
  public static final int DB1_GEN = 1;
  
  private static final int DB1_SHIELD = 5000;
  
  private static final int DB1_ABSORB = 60;
  
  private static final int DB1_PRICE = 20000;
  
  public static final int DB2_GEN = 2;
  
  private static final int DB2_SHIELD = 10000;
  
  private static final int DB2_ABSORB = 70;
  
  private static final int DB2_PRICE = 350000;
  
  public static final int DB3_GEN = 3;
  
  private static final int DB3_SHIELD = 16000;
  
  private static final int DB3_ABSORB = 85;
  
  private static final int DB3_PRICE = 20000;
  
  public static final int DB4_GEN = 4;
  
  public static final int DB5_GEN = 5;
  
  public static final int DB6_GEN = 6;
  
  public int shield;
  
  public int absorption;
  
  public ShieldGen() {}
  
  public ShieldGen(int paramInt) {
    super(3);
    this.subtype = paramInt;
    if (paramInt == 1) {
      this.shield = 5000;
      this.absorption = 60;
      this.price = 20000;
      this.sellPrice = 10000;
    } else if (paramInt == 2) {
      this.shield = 10000;
      this.absorption = 70;
      this.price = 350000;
      this.sellPrice = 175000;
    } else if (paramInt == 3) {
      this.shield = 16000;
      this.absorption = 85;
      this.price = 20000;
      this.sellPrice = 500000;
      this.elite = true;
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\ShieldGen.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */