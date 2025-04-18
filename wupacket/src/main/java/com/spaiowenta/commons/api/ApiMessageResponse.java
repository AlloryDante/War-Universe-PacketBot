package com.spaiowenta.commons.api;

public class ApiMessageResponse {
  private final ApiMessageResponseStatus status = ApiMessageResponseStatus.NORMAL;
  
  private final String message;
  
  public ApiMessageResponse(String paramString) {
    this.message = paramString;
  }
  
  public ApiMessageResponse(ApiMessageResponseStatus paramApiMessageResponseStatus, String paramString) {
    this.message = paramString;
  }
  
  public ApiMessageResponseStatus getStatus() {
    return this.status;
  }
  
  public String getMessage() {
    return this.message;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiMessageResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */