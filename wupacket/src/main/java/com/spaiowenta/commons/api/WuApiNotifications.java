package com.spaiowenta.commons.api;

import com.spaiowenta.commons.api.notifications.LoggedInFromAnotherDeviceNotification;
import com.spaiowenta.commons.api.notifications.casebox.CollectingCaseStatusNotification;
import com.spaiowenta.commons.api.notifications.mapinfo.MapInfoNotification;
import com.spaiowenta.commons.api.notifications.tutorial.TutorialTabNotification;
import java.util.HashMap;
import java.util.Map;

public class WuApiNotifications {
  private static Map<String, Class<?>> notificationClassesByApiNotificationKey = new HashMap<>();
  
  public static Class<?> getNotificationClassByApiNotificationKey(String paramString) {
    return notificationClassesByApiNotificationKey.get(paramString);
  }
  
  public static String getApiNotificationKeyByNotificationClass(Class<?> paramClass) {
    for (Map.Entry<String, Class<?>> entry : notificationClassesByApiNotificationKey.entrySet()) {
      if (((Class)entry.getValue()).equals(paramClass))
        return (String)entry.getKey(); 
    } 
    return null;
  }
  
  static {
    notificationClassesByApiNotificationKey.put("logged-in-from-another-device", LoggedInFromAnotherDeviceNotification.class);
    notificationClassesByApiNotificationKey.put("collecting-case-status", CollectingCaseStatusNotification.class);
    notificationClassesByApiNotificationKey.put("tutorial-tab", TutorialTabNotification.class);
    notificationClassesByApiNotificationKey.put("map-info", MapInfoNotification.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\WuApiNotifications.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */