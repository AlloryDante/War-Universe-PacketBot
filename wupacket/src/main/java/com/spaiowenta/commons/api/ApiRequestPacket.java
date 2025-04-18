package com.spaiowenta.commons.api;

public class ApiRequestPacket {
  private int requestId;

  private String uri;

  private String requestDataJson;

  private ApiRequestPacket() {
  }

  public ApiRequestPacket(int paramInt, String paramString1, String paramString2) {
    this.requestId = paramInt;
    this.uri = paramString1;
    this.requestDataJson = paramString2;
  }

  public int getRequestId() {
    return this.requestId;
  }

  public String getUri() {
    return this.uri;
  }

  public String getRequestDataJson() {
    return this.requestDataJson;
  }
}

/*
 * Location: D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\
 * ApiRequestPacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */