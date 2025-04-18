package com.spaiowenta.commons.api.equipment.settings;

public class AutomaticCompressorSettings implements EquipmentSettings {
  private boolean darkonit = true;
  
  private boolean uranit = true;
  
  private boolean azurit = true;
  
  private boolean dungid = true;
  
  private boolean xureon = true;
  
  public boolean isDarkonit() {
    return this.darkonit;
  }
  
  public boolean isUranit() {
    return this.uranit;
  }
  
  public boolean isAzurit() {
    return this.azurit;
  }
  
  public boolean isDungid() {
    return this.dungid;
  }
  
  public boolean isXureon() {
    return this.xureon;
  }
  
  public void setDarkonit(boolean paramBoolean) {
    this.darkonit = paramBoolean;
  }
  
  public void setUranit(boolean paramBoolean) {
    this.uranit = paramBoolean;
  }
  
  public void setAzurit(boolean paramBoolean) {
    this.azurit = paramBoolean;
  }
  
  public void setDungid(boolean paramBoolean) {
    this.dungid = paramBoolean;
  }
  
  public void setXureon(boolean paramBoolean) {
    this.xureon = paramBoolean;
  }
  
  public AutomaticCompressorSettings(boolean paramBoolean1, boolean paramBoolean2, boolean paramBoolean3, boolean paramBoolean4, boolean paramBoolean5) {
    this.darkonit = paramBoolean1;
    this.uranit = paramBoolean2;
    this.azurit = paramBoolean3;
    this.dungid = paramBoolean4;
    this.xureon = paramBoolean5;
  }
  
  public AutomaticCompressorSettings() {}
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\settings\AutomaticCompressorSettings.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */