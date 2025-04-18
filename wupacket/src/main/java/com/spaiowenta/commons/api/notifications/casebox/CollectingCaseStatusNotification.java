package com.spaiowenta.commons.api.notifications.casebox;

import com.spaiowenta.commons.api.notifications.Notification;

public class CollectingCaseStatusNotification implements Notification {
  private int boxId;
  
  private CollectingCaseStatusNotification$Status status;
  
  private float progress;
  
  public int getBoxId() {
    return this.boxId;
  }
  
  public CollectingCaseStatusNotification$Status getStatus() {
    return this.status;
  }
  
  public float getProgress() {
    return this.progress;
  }
  
  public void setBoxId(int paramInt) {
    this.boxId = paramInt;
  }
  
  public void setStatus(CollectingCaseStatusNotification$Status paramCollectingCaseStatusNotification$Status) {
    this.status = paramCollectingCaseStatusNotification$Status;
  }
  
  public void setProgress(float paramFloat) {
    this.progress = paramFloat;
  }
  
  public CollectingCaseStatusNotification() {}
  
  public CollectingCaseStatusNotification(int paramInt, CollectingCaseStatusNotification$Status paramCollectingCaseStatusNotification$Status, float paramFloat) {
    this.boxId = paramInt;
    this.status = paramCollectingCaseStatusNotification$Status;
    this.progress = paramFloat;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\notifications\casebox\CollectingCaseStatusNotification.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */