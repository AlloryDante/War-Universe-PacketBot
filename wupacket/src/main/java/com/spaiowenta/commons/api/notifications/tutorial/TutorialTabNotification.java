package com.spaiowenta.commons.api.notifications.tutorial;

import com.spaiowenta.commons.api.notifications.Notification;

public class TutorialTabNotification implements Notification {
  private TutorialTabType tabType;
  
  public TutorialTabType getTabType() {
    return this.tabType;
  }
  
  public void setTabType(TutorialTabType paramTutorialTabType) {
    this.tabType = paramTutorialTabType;
  }
  
  public TutorialTabNotification() {}
  
  public TutorialTabNotification(TutorialTabType paramTutorialTabType) {
    this.tabType = paramTutorialTabType;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\notifications\tutorial\TutorialTabNotification.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */