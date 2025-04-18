package com.spaiowenta.commons.api;

public final class ApiResponsePacket {
  private int requestId;
  
  private String uri;
  
  private String responseInfoJson;
  
  private String responseDataJson;
  
  private ApiResponsePacket() {}
  
  public ApiResponsePacket(int paramInt, String paramString1, String paramString2, String paramString3) {
    this.requestId = paramInt;
    this.uri = paramString1;
    this.responseInfoJson = paramString2;
    this.responseDataJson = paramString3;
  }
  
  public int getRequestId() {
    return this.requestId;
  }
  
  public String getUri() {
    return this.uri;
  }
  
  public String getResponseInfoJson() {
    return this.responseInfoJson;
  }
  
  public String getResponseDataJson() {
    return this.responseDataJson;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiResponsePacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */