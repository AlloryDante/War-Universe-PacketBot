package com.spaiowenta.commons.api.clan;

import org.jetbrains.annotations.Nullable;

public class ClanEditRequest {
  @Nullable
  private final String newClanName;
  
  @Nullable
  private final String newClanDescription;
  
  @Nullable
  public String getNewClanName() {
    return this.newClanName;
  }
  
  @Nullable
  public String getNewClanDescription() {
    return this.newClanDescription;
  }
  
  public ClanEditRequest(@Nullable String paramString1, @Nullable String paramString2) {
    this.newClanName = paramString1;
    this.newClanDescription = paramString2;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\ClanEditRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */