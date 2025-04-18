package com.spaiowenta.commons.packets;

public class GameStateResponsePacket {
  @Deprecated
  public ChangedParameter[] mapChanges;

  public GameEvent[] events;

  public MapEvent[] mapEvents;

  public boolean flushCollectables;

  public CollectableInPacket[] collectables;

  public int playerId;

  public int confi;

  public boolean safeZone;

  public ShipInResponse[] ships;

  public static class ShipInResponse {
    public int id;

    public ChangedParameter[] changes;

    public boolean mrs;

    public int clanRelation;

    public int relation;

    public boolean posImportant;

    public boolean destroyed;

    public int[] damages;

    public int[] restores;
  }

}

/*
 * Location: D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\
 * GameStateResponsePacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */