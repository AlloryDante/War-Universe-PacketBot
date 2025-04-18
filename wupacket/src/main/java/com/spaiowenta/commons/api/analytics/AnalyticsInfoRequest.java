package com.spaiowenta.commons.api.analytics;

public final class AnalyticsInfoRequest {
  private final AnalyticsInfoRequest$Platform platform;

  private final String devtodevAppId;

  public AnalyticsInfoRequest(AnalyticsInfoRequest$Platform paramAnalyticsInfoRequest$Platform, String paramString) {
    this.platform = paramAnalyticsInfoRequest$Platform;
    this.devtodevAppId = paramString;
  }

  public AnalyticsInfoRequest$Platform getPlatform() {
    return this.platform;
  }

  public String getDevtodevAppId() {
    return this.devtodevAppId;
  }

  public boolean equals(Object paramObject) {
    if (paramObject == this)
      return true;
    if (!(paramObject instanceof AnalyticsInfoRequest))
      return false;
    AnalyticsInfoRequest analyticsInfoRequest = (AnalyticsInfoRequest) paramObject;
    AnalyticsInfoRequest$Platform analyticsInfoRequest$Platform1 = getPlatform();
    AnalyticsInfoRequest$Platform analyticsInfoRequest$Platform2 = analyticsInfoRequest.getPlatform();
    if ((analyticsInfoRequest$Platform1 == null) ? (analyticsInfoRequest$Platform2 != null)
        : !analyticsInfoRequest$Platform1.equals(analyticsInfoRequest$Platform2))
      return false;
    String str1 = getDevtodevAppId();
    String str2 = analyticsInfoRequest.getDevtodevAppId();
    return !((str1 == null) ? (str2 != null) : !str1.equals(str2));
  }

  // public int hashCode() {
  // byte b = 59;
  // null = 1;
  // AnalyticsInfoRequest$Platform analyticsInfoRequest$Platform = getPlatform();
  // null = null * 59 + ((analyticsInfoRequest$Platform == null) ? 43 :
  // analyticsInfoRequest$Platform.hashCode());
  // String str = getDevtodevAppId();
  // return null * 59 + ((str == null) ? 43 : str.hashCode());
  // }

  public String toString() {
    return "AnalyticsInfoRequest(platform=" + getPlatform() + ", devtodevAppId=" + getDevtodevAppId() + ")";
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\analytics\
 * AnalyticsInfoRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */