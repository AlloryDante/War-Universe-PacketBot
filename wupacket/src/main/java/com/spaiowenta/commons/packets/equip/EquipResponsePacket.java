package com.spaiowenta.commons.packets.equip;

import com.spaiowenta.commons.packets.HangarInPacket;

public class EquipResponsePacket {
  public HangarInPacket[] hangars;
  
  public int hangarPrice;
  
  public Equipment[] onShip;
  
  public Equipment[] equip;
  
  public Drone[] drones;
  
  public int laserSlots;
  
  public int genSlots;
  
  public int extSlots;
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\equip\EquipResponsePacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */