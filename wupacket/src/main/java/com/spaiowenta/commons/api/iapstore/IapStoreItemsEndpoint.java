package com.spaiowenta.commons.api.iapstore;

import com.spaiowenta.commons.api.ApiEmptyRequest;
import com.spaiowenta.commons.api.ApiEndpoint;

public class IapStoreItemsEndpoint extends ApiEndpoint<ApiEmptyRequest, IapStoreItemsResponseData> {
  public IapStoreItemsEndpoint(String paramString) {
    super(paramString, ApiEmptyRequest.class, IapStoreItemsResponseData.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\iapstore\IapStoreItemsEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */