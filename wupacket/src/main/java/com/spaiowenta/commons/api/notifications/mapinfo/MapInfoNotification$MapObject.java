package com.spaiowenta.commons.api.notifications.mapinfo;

public class MapInfoNotification$MapObject {
  private MapInfoNotification$MapObjectType type;
  
  private int subtype;
  
  private int x;
  
  private int y;
  
  public MapInfoNotification$MapObjectType getType() {
    return this.type;
  }
  
  public int getSubtype() {
    return this.subtype;
  }
  
  public int getX() {
    return this.x;
  }
  
  public int getY() {
    return this.y;
  }
  
  public void setType(MapInfoNotification$MapObjectType paramMapInfoNotification$MapObjectType) {
    this.type = paramMapInfoNotification$MapObjectType;
  }
  
  public void setSubtype(int paramInt) {
    this.subtype = paramInt;
  }
  
  public void setX(int paramInt) {
    this.x = paramInt;
  }
  
  public void setY(int paramInt) {
    this.y = paramInt;
  }
  
  public MapInfoNotification$MapObject() {}
  
  public MapInfoNotification$MapObject(MapInfoNotification$MapObjectType paramMapInfoNotification$MapObjectType, int paramInt1, int paramInt2, int paramInt3) {
    this.type = paramMapInfoNotification$MapObjectType;
    this.subtype = paramInt1;
    this.x = paramInt2;
    this.y = paramInt3;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\notifications\mapinfo\MapInfoNotification$MapObject.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */