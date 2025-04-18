package com.spaiowenta.commons.api.iapstore;

public final class IapStoreFreePackStateResponse {
  private final Long freePackAvailableInSeconds;

  public IapStoreFreePackStateResponse(Long paramLong) {
    this.freePackAvailableInSeconds = paramLong;
  }

  public Long getFreePackAvailableInSeconds() {
    return this.freePackAvailableInSeconds;
  }

  public boolean equals(Object paramObject) {
    if (paramObject == this)
      return true;
    if (!(paramObject instanceof IapStoreFreePackStateResponse))
      return false;
    IapStoreFreePackStateResponse iapStoreFreePackStateResponse = (IapStoreFreePackStateResponse) paramObject;
    Long long_1 = getFreePackAvailableInSeconds();
    Long long_2 = iapStoreFreePackStateResponse.getFreePackAvailableInSeconds();
    return !((long_1 == null) ? (long_2 != null) : !long_1.equals(long_2));
  }

  // public int hashCode() {
  // byte b = 59;
  // null = 1;
  // Long long_ = getFreePackAvailableInSeconds();
  // return null * 59 + ((long_ == null) ? 43 : long_.hashCode());
  // }

  public String toString() {
    return "IapStoreFreePackStateResponse(freePackAvailableInSeconds=" + getFreePackAvailableInSeconds() + ")";
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\iapstore\
 * IapStoreFreePackStateResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */