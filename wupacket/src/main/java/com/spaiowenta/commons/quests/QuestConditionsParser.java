package com.spaiowenta.commons.quests;

import java.util.ArrayList;

public class QuestConditionsParser {
  int GR = 0;
  
  int CO = 1;
  
  int SOCO = 2;
  
  int GC = 3;
  
  String srcData;
  
  char[][] K = new char[][] { { '{', '}' }, { '[', ']' }, { '<', '>' }, { '(', ')' } };
  
  public void setData(String paramString) {
    this.srcData = paramString;
  }
  
  public QuestParsedCondition parse() {
    if (this.srcData == null || this.srcData.length() == 0 || !this.srcData.startsWith("{"))
      return null; 
    String str = this.srcData.substring(this.srcData.indexOf("{") + 1, this.srcData.lastIndexOf("}"));
    return parseGroup(str);
  }
  
  QuestParsedCondition parseGroup(String paramString) {
    QuestParsedCondition questParsedCondition = new QuestParsedCondition();
    questParsedCondition.isGroup = true;
    ArrayList<QuestParsedCondition> arrayList = new ArrayList();
    boolean bool1 = true;
    boolean bool2 = false;
    int i = 0;
    byte b1 = 0;
    byte b2 = 0;
    for (byte b3 = 0; b3 < paramString.length(); b3++) {
      char c = paramString.charAt(b3);
      if (bool2) {
        if (c == this.K[i][0]) {
          b2++;
        } else if (i == getKeyType(c)) {
          if (b2 > 0) {
            b2--;
          } else {
            String str = paramString.substring(b1 + 1, b3);
            if (i == this.GR) {
              QuestParsedCondition questParsedCondition1 = parseGroup(str);
              if (questParsedCondition1 != null) {
                bool1 = false;
                arrayList.add(questParsedCondition1);
              } 
            } else if (i == this.CO) {
              QuestParsedCondition questParsedCondition1 = parseCondition(str);
              if (questParsedCondition1 != null) {
                bool1 = false;
                arrayList.add(questParsedCondition1);
              } 
            } else if (i == this.SOCO) {
              QuestParsedCondition questParsedCondition1 = parseSoCondition(str);
              if (questParsedCondition1 != null) {
                bool1 = false;
                arrayList.add(questParsedCondition1);
              } 
            } else if (i == this.GC) {
              parseGroupCondition(questParsedCondition, str);
            } 
            bool2 = false;
          } 
        } 
      } else if (isStartingKey(c)) {
        bool2 = true;
        i = getKeyType(c);
        b1 = b3;
        b2 = 0;
      } 
    } 
    if (!bool1)
      questParsedCondition.childs = arrayList.<QuestParsedCondition>toArray(new QuestParsedCondition[arrayList.size()]); 
    return bool1 ? null : questParsedCondition;
  }
  
  QuestParsedCondition parseCondition(String paramString) {
    QuestParsedCondition questParsedCondition = new QuestParsedCondition();
    if (paramString.charAt(0) == '^') {
      questParsedCondition.antiCond = true;
      paramString = paramString.substring(1);
    } 
    String[] arrayOfString = paramString.split(":");
    questParsedCondition.id = Integer.valueOf(arrayOfString[0]).intValue();
    questParsedCondition.type = arrayOfString[1];
    ArrayList<String> arrayList = null;
    if (arrayOfString.length > 2)
      for (byte b = 2; b < arrayOfString.length; b++) {
        String str = arrayOfString[b];
        if (!str.startsWith("<")) {
          if (arrayList == null)
            arrayList = new ArrayList(); 
          arrayList.add(str);
        } 
      }  
    if (arrayList != null)
      questParsedCondition.args = arrayList.<String>toArray(new String[arrayList.size()]); 
    return questParsedCondition;
  }
  
  QuestParsedCondition parseSoCondition(String paramString) {
    QuestParsedCondition questParsedCondition = new QuestParsedCondition();
    questParsedCondition.isSoCondition = true;
    String[] arrayOfString = paramString.split(":");
    questParsedCondition.type = arrayOfString[0].toUpperCase();
    ArrayList<String> arrayList = null;
    if (arrayOfString.length > 1)
      for (byte b = 1; b < arrayOfString.length; b++) {
        String str = arrayOfString[b];
        if (arrayList == null)
          arrayList = new ArrayList(); 
        arrayList.add(str);
      }  
    if (arrayList != null)
      questParsedCondition.args = arrayList.<String>toArray(new String[arrayList.size()]); 
    return questParsedCondition;
  }
  
  void parseGroupCondition(QuestParsedCondition paramQuestParsedCondition, String paramString) {
    if (paramString.equals("O")) {
      paramQuestParsedCondition.ordered = true;
    } else if (paramString.equals("OC")) {
      paramQuestParsedCondition.oneOfCond = true;
    } 
  }
  
  boolean isStartingKey(char paramChar) {
    for (byte b = 0; b < this.K.length; b++) {
      if (this.K[b][0] == paramChar)
        return true; 
    } 
    return false;
  }
  
  boolean isEndingKey(char paramChar) {
    for (byte b = 0; b < this.K.length; b++) {
      if (this.K[b][1] == paramChar)
        return true; 
    } 
    return false;
  }
  
  int getKeyType(char paramChar) {
    for (byte b = 0; b < this.K.length; b++) {
      if (this.K[b][0] == paramChar || this.K[b][1] == paramChar)
        return b; 
    } 
    return -1;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\quests\QuestConditionsParser.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */