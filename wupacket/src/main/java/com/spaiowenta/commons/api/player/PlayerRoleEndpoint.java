package com.spaiowenta.commons.api.player;

import com.spaiowenta.commons.api.ApiEmptyRequest;
import com.spaiowenta.commons.api.ApiEndpoint;

public class PlayerRoleEndpoint extends ApiEndpoint<ApiEmptyRequest, PlayerRoleResponse> {
  public PlayerRoleEndpoint(String paramString) {
    super(paramString, ApiEmptyRequest.class, PlayerRoleResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\player\PlayerRoleEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */