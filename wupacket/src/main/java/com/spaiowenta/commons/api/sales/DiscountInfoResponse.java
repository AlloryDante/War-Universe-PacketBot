package com.spaiowenta.commons.api.sales;

public class DiscountInfoResponse {
  private final boolean goldSaleEnabled;
  
  public boolean isGoldSaleEnabled() {
    return this.goldSaleEnabled;
  }
  
  public DiscountInfoResponse(boolean paramBoolean) {
    this.goldSaleEnabled = paramBoolean;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\sales\DiscountInfoResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */