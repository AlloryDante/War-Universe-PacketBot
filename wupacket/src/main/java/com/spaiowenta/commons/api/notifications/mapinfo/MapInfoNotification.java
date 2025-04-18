package com.spaiowenta.commons.api.notifications.mapinfo;

import com.spaiowenta.commons.api.notifications.Notification;
import java.util.List;

public class MapInfoNotification implements Notification {
  private int mapId;
  
  private String name;
  
  private int width;
  
  private int height;
  
  private List<MapInfoNotification$MapObject> mapObjects;
  
  public int getMapId() {
    return this.mapId;
  }
  
  public String getName() {
    return this.name;
  }
  
  public int getWidth() {
    return this.width;
  }
  
  public int getHeight() {
    return this.height;
  }
  
  public List<MapInfoNotification$MapObject> getMapObjects() {
    return this.mapObjects;
  }
  
  public void setMapId(int paramInt) {
    this.mapId = paramInt;
  }
  
  public void setName(String paramString) {
    this.name = paramString;
  }
  
  public void setWidth(int paramInt) {
    this.width = paramInt;
  }
  
  public void setHeight(int paramInt) {
    this.height = paramInt;
  }
  
  public void setMapObjects(List<MapInfoNotification$MapObject> paramList) {
    this.mapObjects = paramList;
  }
  
  public MapInfoNotification() {}
  
  public MapInfoNotification(int paramInt1, String paramString, int paramInt2, int paramInt3, List<MapInfoNotification$MapObject> paramList) {
    this.mapId = paramInt1;
    this.name = paramString;
    this.width = paramInt2;
    this.height = paramInt3;
    this.mapObjects = paramList;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\notifications\mapinfo\MapInfoNotification.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */