package com.spaiowenta.commons.api.clan;

import org.jetbrains.annotations.Nullable;

public class ClanEditResponse {
  private final boolean success;
  
  @Nullable
  private final String errorMessage;
  
  public static ClanEditResponse success() {
    return new ClanEditResponse(true, null);
  }
  
  public static ClanEditResponse error(String paramString) {
    return new ClanEditResponse(false, paramString);
  }
  
  public boolean isSuccess() {
    return this.success;
  }
  
  @Nullable
  public String getErrorMessage() {
    return this.errorMessage;
  }
  
  public ClanEditResponse(boolean paramBoolean, @Nullable String paramString) {
    this.success = paramBoolean;
    this.errorMessage = paramString;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\ClanEditResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */