package com.spaiowenta.commons.api.auction;

import org.jetbrains.annotations.Nullable;

public class AuctionLotsRequest {
  @Nullable
  private final AuctionLotsRequest$Category category;
  
  public AuctionLotsRequest(@Nullable AuctionLotsRequest$Category paramAuctionLotsRequest$Category) {
    this.category = paramAuctionLotsRequest$Category;
  }
  
  @Nullable
  public AuctionLotsRequest$Category getCategory() {
    return this.category;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auction\AuctionLotsRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */