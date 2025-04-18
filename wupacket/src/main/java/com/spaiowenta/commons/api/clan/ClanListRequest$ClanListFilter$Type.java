package com.spaiowenta.commons.api.clan;

import com.spaiowenta.commons.api.clan.filter.ClanListFilter;
import com.spaiowenta.commons.api.clan.filter.DiplomacyClanListFilter;
import com.spaiowenta.commons.api.clan.filter.SearchClanListFilter;

public enum ClanListRequest$ClanListFilter$Type {
  SEARCH((Class)SearchClanListFilter.class),
  DIPLOMACY((Class)DiplomacyClanListFilter.class);
  
  private final Class<? extends ClanListFilter> clanListFilterClass;
  
  ClanListRequest$ClanListFilter$Type(Class<? extends ClanListFilter> paramClass) {
    this.clanListFilterClass = paramClass;
  }
  
  public Class<? extends ClanListFilter> getClanListFilterClass() {
    return this.clanListFilterClass;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\ClanListRequest$ClanListFilter$Type.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */