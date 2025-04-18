package com.spaiowenta.commons.quests;

import java.util.List;

public class QuestProgressUpdate {
  private int questId;
  
  private List<QuestProgressUpdate$Progress> progress;
  
  public int getQuestId() {
    return this.questId;
  }
  
  public List<QuestProgressUpdate$Progress> getProgress() {
    return this.progress;
  }
  
  public void setQuestId(int paramInt) {
    this.questId = paramInt;
  }
  
  public void setProgress(List<QuestProgressUpdate$Progress> paramList) {
    this.progress = paramList;
  }
  
  public QuestProgressUpdate(int paramInt, List<QuestProgressUpdate$Progress> paramList) {
    this.questId = paramInt;
    this.progress = paramList;
  }
  
  public QuestProgressUpdate() {}
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\quests\QuestProgressUpdate.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */