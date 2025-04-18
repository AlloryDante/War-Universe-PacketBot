package com.spaiowenta.commons.api.auth;

import com.spaiowenta.commons.d;
import com.spaiowenta.commons.json.a;

import org.jetbrains.annotations.Nullable;

public class AuthSignInRequestData {
  @d(a = "sessionId")
  @Nullable
  public String sessionId;

  @d(a = "clientInfo")
  @Nullable
  public a clientInfo;

  public String toString() {
    return "AuthSignInRequestData{sessionId='" + this.sessionId + '\'' + ", clientInfo=" + this.clientInfo + '}';
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\auth\
 * AuthSignInRequestData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */