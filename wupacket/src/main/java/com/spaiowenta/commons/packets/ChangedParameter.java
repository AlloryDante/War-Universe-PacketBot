package com.spaiowenta.commons.packets;

public class ChangedParameter {
  public int id;
  
  public int type;
  
  public Object data;
  
  public ChangedParameter(int paramInt, Object paramObject) {
    this(paramInt, 0, paramObject);
  }
  
  public ChangedParameter(int paramInt1, int paramInt2, Object paramObject) {
    this.id = paramInt1;
    this.type = paramInt2;
    this.data = paramObject;
  }
  
  public ChangedParameter() {}
  
  public boolean isChanged(Object paramObject) {
    return ((this.data == null && paramObject != null) || (this.data != null && !this.data.equals(paramObject)));
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\ChangedParameter.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */