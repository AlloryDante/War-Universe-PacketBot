package com.spaiowenta.commons.api.equipment;

public class EquipmentSettingsGetRequest {
  private final EquipmentSettingsType equipmentSettingsType;
  
  public EquipmentSettingsType getEquipmentSettingsType() {
    return this.equipmentSettingsType;
  }
  
  public EquipmentSettingsGetRequest(EquipmentSettingsType paramEquipmentSettingsType) {
    this.equipmentSettingsType = paramEquipmentSettingsType;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\EquipmentSettingsGetRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */