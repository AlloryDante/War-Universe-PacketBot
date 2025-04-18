package com.spaiowenta.commons.api.shop;

import com.spaiowenta.commons.api.ApiEmptyRequest;
import com.spaiowenta.commons.api.ApiEndpoint;

public class ShopItemsEndpoint extends ApiEndpoint<ApiEmptyRequest, ShopItemsResponseData> {
  public ShopItemsEndpoint(String paramString) {
    super(paramString, ApiEmptyRequest.class, ShopItemsResponseData.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\shop\ShopItemsEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */