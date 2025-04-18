package com.spaiowenta.commons.api.shop;

public class ShopBuyItemRequestData {
  private final int quantity;
  
  private final int itemId;
  
  private final int price;
  
  public ShopBuyItemRequestData(int paramInt1, int paramInt2, int paramInt3) {
    this.itemId = paramInt1;
    this.quantity = paramInt2;
    this.price = paramInt3;
  }
  
  public int getItemId() {
    return this.itemId;
  }
  
  public int getQuantity() {
    return this.quantity;
  }
  
  public int getPrice() {
    return this.price;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\shop\ShopBuyItemRequestData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */