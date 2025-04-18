package com.spaiowenta.commons.api.analytics;

public final class AnalyticsInfoResponse {
  private final String userId;

  private final Integer userLevel;

  public AnalyticsInfoResponse(String paramString, Integer paramInteger) {
    this.userId = paramString;
    this.userLevel = paramInteger;
  }

  public String getUserId() {
    return this.userId;
  }

  public Integer getUserLevel() {
    return this.userLevel;
  }

  public boolean equals(Object paramObject) {
    if (paramObject == this)
      return true;
    if (!(paramObject instanceof AnalyticsInfoResponse))
      return false;
    AnalyticsInfoResponse analyticsInfoResponse = (AnalyticsInfoResponse) paramObject;
    Integer integer1 = getUserLevel();
    Integer integer2 = analyticsInfoResponse.getUserLevel();
    if ((integer1 == null) ? (integer2 != null) : !integer1.equals(integer2))
      return false;
    String str1 = getUserId();
    String str2 = analyticsInfoResponse.getUserId();
    return !((str1 == null) ? (str2 != null) : !str1.equals(str2));
  }

  // public int hashCode() {
  // byte b = 59;
  // null = 1;
  // Integer integer = getUserLevel();
  // null = null * 59 + ((integer == null) ? 43 : integer.hashCode());
  // String str = getUserId();
  // return null * 59 + ((str == null) ? 43 : str.hashCode());
  // }

  public String toString() {
    return "AnalyticsInfoResponse(userId=" + getUserId() + ", userLevel=" + getUserLevel() + ")";
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\analytics\
 * AnalyticsInfoResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */