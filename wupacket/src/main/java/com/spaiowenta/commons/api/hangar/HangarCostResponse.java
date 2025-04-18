package com.spaiowenta.commons.api.hangar;

import com.spaiowenta.commons.api.ApiMessageResponse;
import com.spaiowenta.commons.api.ApiMessageResponseStatus;

public class HangarCostResponse extends ApiMessageResponse {
  private final int cost;
  
  public HangarCostResponse(int paramInt, ApiMessageResponseStatus paramApiMessageResponseStatus, String paramString) {
    super(paramApiMessageResponseStatus, paramString);
    this.cost = paramInt;
  }
  
  public int getCost() {
    return this.cost;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\hangar\HangarCostResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */