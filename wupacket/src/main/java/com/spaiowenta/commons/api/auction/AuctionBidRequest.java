package com.spaiowenta.commons.api.auction;

public class AuctionBidRequest {
  private final int lotId;
  
  private final int bidAmount;
  
  public AuctionBidRequest(int paramInt1, int paramInt2) {
    this.lotId = paramInt1;
    this.bidAmount = paramInt2;
  }
  
  public int getLotId() {
    return this.lotId;
  }
  
  public int getBidAmount() {
    return this.bidAmount;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auction\AuctionBidRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */