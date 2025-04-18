package com.spaiowenta.commons.packets.chat;

public class ChatMessageData {
  public String roomId;
  
  public String author;
  
  public String msg;
  
  public int status;
  
  public ChatMessageData(String paramString1, String paramString2, String paramString3, int paramInt) {
    this.roomId = paramString1;
    this.author = paramString2;
    this.msg = paramString3;
    this.status = paramInt;
  }
  
  public Object toStringArray() {
    return new String[] { this.roomId, this.author, this.msg, String.valueOf(this.status) };
  }
  
  public static ChatMessageData parse(Object paramObject) {
    String[] arrayOfString = (String[])paramObject;
    return new ChatMessageData(arrayOfString[0], arrayOfString[1], arrayOfString[2], Integer.parseInt(arrayOfString[3]));
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\chat\ChatMessageData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */