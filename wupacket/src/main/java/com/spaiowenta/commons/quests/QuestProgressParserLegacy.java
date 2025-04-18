package com.spaiowenta.commons.quests;

import java.util.ArrayList;

public class QuestProgressParserLegacy {
  public static QuestParsedProgressLegacy[] parse(String paramString) {
    if (paramString == null || paramString.length() == 0)
      return null; 
    try {
      String[] arrayOfString = paramString.split("\\[");
      ArrayList<QuestParsedProgressLegacy> arrayList = new ArrayList();
      for (String str : arrayOfString) {
        if (str.length() != 0)
          try {
            String str1 = str.substring(0, str.lastIndexOf("]"));
            String[] arrayOfString1 = str1.split("\\:");
            int i = Integer.valueOf(arrayOfString1[0]).intValue();
            QuestParsedProgressLegacy questParsedProgressLegacy = new QuestParsedProgressLegacy();
            questParsedProgressLegacy.condId = i;
            String[] arrayOfString2 = new String[arrayOfString1.length - 1];
            for (byte b = 1; b < arrayOfString1.length; b++)
              arrayOfString2[b - 1] = arrayOfString1[b]; 
            questParsedProgressLegacy.args = arrayOfString2;
            arrayList.add(questParsedProgressLegacy);
          } catch (Exception exception) {
            exception.printStackTrace();
          }  
      } 
      return arrayList.<QuestParsedProgressLegacy>toArray(new QuestParsedProgressLegacy[arrayList.size()]);
    } catch (Exception exception) {
      exception.printStackTrace();
      return null;
    } 
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\quests\QuestProgressParserLegacy.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */