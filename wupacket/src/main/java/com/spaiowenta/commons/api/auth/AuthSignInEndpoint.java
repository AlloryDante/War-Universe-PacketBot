package com.spaiowenta.commons.api.auth;

import com.spaiowenta.commons.api.ApiEndpoint;
import com.spaiowenta.commons.api.ApiMessageResponse;

public class AuthSignInEndpoint extends ApiEndpoint<AuthSignInRequestData, ApiMessageResponse> {
  public AuthSignInEndpoint(String paramString) {
    super(paramString, AuthSignInRequestData.class, ApiMessageResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auth\AuthSignInEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */