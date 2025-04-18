package com.spaiowenta.commons.api.auction;

import com.spaiowenta.commons.api.ApiEmptyRequest;
import com.spaiowenta.commons.api.ApiEndpoint;

public class AuctionHistoryEndpoint extends ApiEndpoint<ApiEmptyRequest, AuctionHistoryResponse> {
  public AuctionHistoryEndpoint(String paramString) {
    super(paramString, ApiEmptyRequest.class, AuctionHistoryResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auction\AuctionHistoryEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */