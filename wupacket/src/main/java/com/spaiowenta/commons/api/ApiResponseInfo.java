package com.spaiowenta.commons.api;

public class ApiResponseInfo {
  private final ApiResponseNetStatus netStatus;
  
  public ApiResponseInfo(ApiResponseNetStatus paramApiResponseNetStatus) {
    this.netStatus = paramApiResponseNetStatus;
  }
  
  public ApiResponseNetStatus getNetStatus() {
    return this.netStatus;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiResponseInfo.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */