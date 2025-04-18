package com.spaiowenta.commons.api.auction;

import com.spaiowenta.commons.api.ApiEndpoint;
import com.spaiowenta.commons.api.ApiMessageResponse;

public class AuctionBidEndpoint extends ApiEndpoint<AuctionBidRequest, ApiMessageResponse> {
  public AuctionBidEndpoint(String paramString) {
    super(paramString, AuctionBidRequest.class, ApiMessageResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auction\AuctionBidEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */