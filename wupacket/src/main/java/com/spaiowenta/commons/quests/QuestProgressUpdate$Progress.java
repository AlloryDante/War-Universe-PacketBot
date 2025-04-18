package com.spaiowenta.commons.quests;

import java.util.List;

public class QuestProgressUpdate$Progress {
  private int id;
  
  private String type;
  
  private List<String> args;
  
  public int getId() {
    return this.id;
  }
  
  public String getType() {
    return this.type;
  }
  
  public List<String> getArgs() {
    return this.args;
  }
  
  public void setId(int paramInt) {
    this.id = paramInt;
  }
  
  public void setType(String paramString) {
    this.type = paramString;
  }
  
  public void setArgs(List<String> paramList) {
    this.args = paramList;
  }
  
  public QuestProgressUpdate$Progress(int paramInt, String paramString, List<String> paramList) {
    this.id = paramInt;
    this.type = paramString;
    this.args = paramList;
  }
  
  public QuestProgressUpdate$Progress() {}
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\quests\QuestProgressUpdate$Progress.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */