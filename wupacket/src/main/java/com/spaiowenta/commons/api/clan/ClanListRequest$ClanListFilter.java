package com.spaiowenta.commons.api.clan;

public class ClanListRequest$ClanListFilter {
  private final ClanListRequest$ClanListFilter$Type type;
  
  private final String json;
  
  public ClanListRequest$ClanListFilter(ClanListRequest$ClanListFilter$Type paramClanListRequest$ClanListFilter$Type, String paramString) {
    this.type = paramClanListRequest$ClanListFilter$Type;
    this.json = paramString;
  }
  
  public ClanListRequest$ClanListFilter$Type getType() {
    return this.type;
  }
  
  public String getJson() {
    return this.json;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\ClanListRequest$ClanListFilter.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */