package com.spaiowenta.commons.api.iapstore;

public class IapStoreBuyItemRequestData {
  private final int itemId;
  
  private final int itemPrice;
  
  public IapStoreBuyItemRequestData(int paramInt1, int paramInt2) {
    this.itemId = paramInt1;
    this.itemPrice = paramInt2;
  }
  
  public int getItemId() {
    return this.itemId;
  }
  
  public int getItemPrice() {
    return this.itemPrice;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\iapstore\IapStoreBuyItemRequestData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */