package com.spaiowenta.commons.api.hangar;

public final class HangarPurchaseWithShipRequest {
  private final Integer itemId;

  private final Integer quantity;

  private final Integer price;

  public HangarPurchaseWithShipRequest(Integer paramInteger1, Integer paramInteger2, Integer paramInteger3) {
    this.itemId = paramInteger1;
    this.quantity = paramInteger2;
    this.price = paramInteger3;
  }

  public Integer getItemId() {
    return this.itemId;
  }

  public Integer getQuantity() {
    return this.quantity;
  }

  public Integer getPrice() {
    return this.price;
  }

  public boolean equals(Object paramObject) {
    if (paramObject == this)
      return true;
    if (!(paramObject instanceof HangarPurchaseWithShipRequest))
      return false;
    HangarPurchaseWithShipRequest hangarPurchaseWithShipRequest = (HangarPurchaseWithShipRequest) paramObject;
    Integer integer1 = getItemId();
    Integer integer2 = hangarPurchaseWithShipRequest.getItemId();
    if ((integer1 == null) ? (integer2 != null) : !integer1.equals(integer2))
      return false;
    Integer integer3 = getQuantity();
    Integer integer4 = hangarPurchaseWithShipRequest.getQuantity();
    if ((integer3 == null) ? (integer4 != null) : !integer3.equals(integer4))
      return false;
    Integer integer5 = getPrice();
    Integer integer6 = hangarPurchaseWithShipRequest.getPrice();
    return !((integer5 == null) ? (integer6 != null) : !integer5.equals(integer6));
  }

  // public int hashCode() {
  // byte b = 59;
  // null = 1;
  // Integer integer1 = getItemId();
  // null = null * 59 + ((integer1 == null) ? 43 : integer1.hashCode());
  // Integer integer2 = getQuantity();
  // null = null * 59 + ((integer2 == null) ? 43 : integer2.hashCode());
  // Integer integer3 = getPrice();
  // return null * 59 + ((integer3 == null) ? 43 : integer3.hashCode());
  // }

  public String toString() {
    return "HangarPurchaseWithShipRequest(itemId=" + getItemId() + ", quantity=" + getQuantity() + ", price="
        + getPrice() + ")";
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\hangar\
 * HangarPurchaseWithShipRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */