package com.spaiowenta.commons.api;

public class ApiEndpoint<T, V> {
  private ApiRequestTimeoutType timeoutType = ApiRequestTimeoutType.MEDIUM;
  
  private ApiRequestCooldownType cooldownType = ApiRequestCooldownType.MEDIUM;
  
  private final String uri;
  
  private final Class<T> requestClass;
  
  private final Class<V> responseClass;
  
  public ApiEndpoint(String paramString, Class<T> paramClass, Class<V> paramClass1) {
    this.uri = paramString;
    this.requestClass = paramClass;
    this.responseClass = paramClass1;
  }
  
  public String getUri() {
    return this.uri;
  }
  
  public Class<T> getRequestClass() {
    return this.requestClass;
  }
  
  public Class<V> getResponseClass() {
    return this.responseClass;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\ApiEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */