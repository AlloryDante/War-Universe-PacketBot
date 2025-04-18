package com.spaiowenta.commons.api.adrewarder;

import java.util.List;

public class AdRewarderListResponse {
  private final List<AdRewarderListResponse$AdRewarderLot> lots;
  
  public List<AdRewarderListResponse$AdRewarderLot> getLots() {
    return this.lots;
  }
  
  public AdRewarderListResponse(List<AdRewarderListResponse$AdRewarderLot> paramList) {
    this.lots = paramList;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\adrewarder\AdRewarderListResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */