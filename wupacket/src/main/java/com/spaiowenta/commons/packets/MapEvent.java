package com.spaiowenta.commons.packets;

public class MapEvent {
  private static int n = 0;
  
  public static final int MOTRON_BOMB_EXPLOSION = n++;
  
  public static final int NBOMB_EXPLOSION = n++;
  
  public static final int EMP_EXPLOSION = n++;
  
  public static final int MINE_EXPLOSION = n++;
  
  public int type;
  
  public int x;
  
  public int y;
  
  public Object data;
  
  public MapEvent() {}
  
  public MapEvent(int paramInt1, int paramInt2, int paramInt3) {
    this.type = paramInt1;
    this.x = paramInt2;
    this.y = paramInt3;
  }
  
  public MapEvent(int paramInt, float paramFloat1, float paramFloat2) {
    this.type = paramInt;
    this.x = (int)paramFloat1;
    this.y = (int)paramFloat2;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\MapEvent.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */