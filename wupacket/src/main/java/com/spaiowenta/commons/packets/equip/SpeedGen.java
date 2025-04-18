package com.spaiowenta.commons.packets.equip;

public class SpeedGen extends Equipment {
  public static final int SG1_GEN = 1;
  
  private static final int SG1_SPEED = 4;
  
  private static final int SG1_PRICE = 20000;
  
  public static final int SG2_GEN = 2;
  
  private static final int SG2_SPEED = 7;
  
  private static final int SG2_PRICE = 150000;
  
  public static final int SG3_GEN = 3;
  
  private static final int SG3_SPEED = 10;
  
  private static final int SG3_PRICE = 10000;
  
  public static final int SG4_GEN = 4;
  
  public static final int SG5_GEN = 5;
  
  public static final int SG6_GEN = 6;
  
  public int speed;
  
  public SpeedGen() {}
  
  public SpeedGen(int paramInt) {
    super(2);
    this.subtype = paramInt;
    if (paramInt == 1) {
      this.speed = 4;
      this.price = 20000;
      this.sellPrice = 10000;
    } else if (paramInt == 2) {
      this.speed = 7;
      this.price = 150000;
      this.sellPrice = 75000;
    } else if (paramInt == 3) {
      this.speed = 10;
      this.price = 10000;
      this.sellPrice = 250000;
      this.elite = true;
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\SpeedGen.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */