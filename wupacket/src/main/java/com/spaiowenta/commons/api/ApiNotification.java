package com.spaiowenta.commons.api;

public class ApiNotification {
  private String key;
  
  private String notificationJsonString;
  
  private ApiNotification() {}
  
  public ApiNotification(String paramString1, String paramString2) {
    this.key = paramString1;
    this.notificationJsonString = paramString2;
  }
  
  public String getKey() {
    return this.key;
  }
  
  public String getNotificationJsonString() {
    return this.notificationJsonString;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiNotification.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */