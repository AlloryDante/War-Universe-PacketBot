package com.spaiowenta.commons.api.auth;

import com.spaiowenta.commons.json.a;

public final class AuthTokenLoginRequest {
  private final String token;

  private final a clientInfo;

  public String toString() {
    return "AuthTokenLoginRequest{token='" + this.token + '\'' + ", clientInfo=" + this.clientInfo + '}';
  }

  public AuthTokenLoginRequest(String paramString, a parama) {
    this.token = paramString;
    this.clientInfo = parama;
  }

  public String getToken() {
    return this.token;
  }

  public a getClientInfo() {
    return this.clientInfo;
  }

  public boolean equals(Object paramObject) {
    if (paramObject == this)
      return true;
    if (!(paramObject instanceof AuthTokenLoginRequest))
      return false;
    AuthTokenLoginRequest authTokenLoginRequest = (AuthTokenLoginRequest) paramObject;
    String str1 = getToken();
    String str2 = authTokenLoginRequest.getToken();
    if ((str1 == null) ? (str2 != null) : !str1.equals(str2))
      return false;
    a a1 = getClientInfo();
    a a2 = authTokenLoginRequest.getClientInfo();
    return !((a1 == null) ? (a2 != null) : !a1.equals(a2));
  }

  // public int hashCode() {
  // byte b = 59;
  // null = 1;
  // String str = getToken();
  // null = null * 59 + ((str == null) ? 43 : str.hashCode());
  // a a1 = getClientInfo();
  // return null * 59 + ((a1 == null) ? 43 : a1.hashCode());
  // }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auth\
 * AuthTokenLoginRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */