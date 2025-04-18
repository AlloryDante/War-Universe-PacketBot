package com.spaiowenta.commons.api.equipment;

import com.spaiowenta.commons.api.equipment.settings.AutomaticCompressorSettings;
import com.spaiowenta.commons.api.equipment.settings.EquipmentSettings;

public enum EquipmentSettingsType {
  AUTOMATIC_COMPRESSOR((Class)AutomaticCompressorSettings.class);
  
  private final Class<? extends EquipmentSettings> clazz;
  
  EquipmentSettingsType(Class<? extends EquipmentSettings> paramClass) {
    this.clazz = paramClass;
  }
  
  public Class<? extends EquipmentSettings> getClazz() {
    return this.clazz;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\EquipmentSettingsType.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */