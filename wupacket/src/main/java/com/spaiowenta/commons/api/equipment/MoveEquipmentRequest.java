package com.spaiowenta.commons.api.equipment;

import com.spaiowenta.commons.packets.equip.Equipment;
import java.util.List;

public final class MoveEquipmentRequest {
  private final List<Equipment> items;
  
  private final MoveEquipmentRequest$Operation operation;
  
  private final MoveEquipmentRequest$Vehicle vehicle;
  
  private final int confi;
  
  public MoveEquipmentRequest(List<Equipment> paramList, MoveEquipmentRequest$Operation paramMoveEquipmentRequest$Operation, MoveEquipmentRequest$Vehicle paramMoveEquipmentRequest$Vehicle, int paramInt) {
    this.items = paramList;
    this.operation = paramMoveEquipmentRequest$Operation;
    this.vehicle = paramMoveEquipmentRequest$Vehicle;
    this.confi = paramInt;
  }
  
  public List<Equipment> getItems() {
    return this.items;
  }
  
  public MoveEquipmentRequest$Operation getOperation() {
    return this.operation;
  }
  
  public MoveEquipmentRequest$Vehicle getVehicle() {
    return this.vehicle;
  }
  
  public int getConfi() {
    return this.confi;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\MoveEquipmentRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */