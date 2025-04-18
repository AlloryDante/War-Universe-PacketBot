package com.spaiowenta.commons.api.hangar;

import com.spaiowenta.commons.api.ApiMessageResponse;
import com.spaiowenta.commons.api.ApiMessageResponseStatus;

public class HangarPurchaseWithShipResponse extends ApiMessageResponse {
  private final HangarPurchaseStatus hangarPurchaseStatus;
  
  public HangarPurchaseWithShipResponse(ApiMessageResponseStatus paramApiMessageResponseStatus, String paramString, HangarPurchaseStatus paramHangarPurchaseStatus) {
    super(paramApiMessageResponseStatus, paramString);
    this.hangarPurchaseStatus = paramHangarPurchaseStatus;
  }
  
  public HangarPurchaseStatus getHangarPurchaseStatus() {
    return this.hangarPurchaseStatus;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\hangar\HangarPurchaseWithShipResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */