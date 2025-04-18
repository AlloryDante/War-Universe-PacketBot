package com.spaiowenta.commons.api.equipment;

import com.spaiowenta.commons.api.ApiEndpoint;
import com.spaiowenta.commons.api.ApiMessageResponse;

public class MoveEquipmentEndpoint extends ApiEndpoint<MoveEquipmentRequest, ApiMessageResponse> {
  public MoveEquipmentEndpoint(String paramString) {
    super(paramString, MoveEquipmentRequest.class, ApiMessageResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\MoveEquipmentEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */