package com.spaiowenta.commons.api.shop;

import com.spaiowenta.commons.api.ApiEndpoint;
import com.spaiowenta.commons.api.ApiMessageResponse;

public class ShopBuyItemEndpoint extends ApiEndpoint<ShopBuyItemRequestData, ApiMessageResponse> {
  public ShopBuyItemEndpoint(String paramString) {
    super(paramString, ShopBuyItemRequestData.class, ApiMessageResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\shop\ShopBuyItemEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */