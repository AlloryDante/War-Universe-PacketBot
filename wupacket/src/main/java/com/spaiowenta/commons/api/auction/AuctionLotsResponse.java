package com.spaiowenta.commons.api.auction;

import java.util.List;

import com.spaiowenta.commons.d;

public class AuctionLotsResponse {
  @d(a = "lots")
  public List<AuctionLotsResponse$LotData> lots;

  @d(a = "timeleft")
  public Long timeLeft;
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auction\
 * AuctionLotsResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */