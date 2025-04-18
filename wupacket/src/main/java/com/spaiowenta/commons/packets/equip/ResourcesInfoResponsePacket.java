package com.spaiowenta.commons.packets.equip;

public class ResourcesInfoResponsePacket {
  public static class EnrichmentInfo {
    public int amount;

    public int type;

    public int[] possibleResources;
  }

  public ResourceInfo[] resources;
  public EnrichmentInfo[] enriches;
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\
 * ResourcesInfoResponsePacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */