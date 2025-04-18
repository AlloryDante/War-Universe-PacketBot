package com.spaiowenta.commons.api.hangar;

import com.spaiowenta.commons.api.ApiEmptyRequest;
import com.spaiowenta.commons.api.ApiEndpoint;

public class HangarCostEndpoint extends ApiEndpoint<ApiEmptyRequest, HangarCostResponse> {
  public HangarCostEndpoint(String paramString) {
    super(paramString, ApiEmptyRequest.class, HangarCostResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\hangar\HangarCostEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */