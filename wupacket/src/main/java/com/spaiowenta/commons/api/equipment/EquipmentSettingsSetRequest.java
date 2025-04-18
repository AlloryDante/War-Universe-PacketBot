package com.spaiowenta.commons.api.equipment;

public class EquipmentSettingsSetRequest {
  private final EquipmentSettingsType equipmentSettingsType;
  
  private final String equipmentSettingsJson;
  
  public EquipmentSettingsType getEquipmentSettingsType() {
    return this.equipmentSettingsType;
  }
  
  public String getEquipmentSettingsJson() {
    return this.equipmentSettingsJson;
  }
  
  public EquipmentSettingsSetRequest(EquipmentSettingsType paramEquipmentSettingsType, String paramString) {
    this.equipmentSettingsType = paramEquipmentSettingsType;
    this.equipmentSettingsJson = paramString;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\EquipmentSettingsSetRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */