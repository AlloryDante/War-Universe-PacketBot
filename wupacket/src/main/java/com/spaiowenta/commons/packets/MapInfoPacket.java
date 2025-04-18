package com.spaiowenta.commons.packets;

public class MapInfoPacket {
  public int mapId;

  public String name;

  public int width;

  public int height;

  public boolean spaceStation;

  public float ssx;

  public float ssy;

  public int[] tradeStation;

  public class TPort {
    public int type;

    public int subtype;

    public int x;

    public int y;
  }

  public TPort[] teleports;
}

/*
 * Location: D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\
 * MapInfoPacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */