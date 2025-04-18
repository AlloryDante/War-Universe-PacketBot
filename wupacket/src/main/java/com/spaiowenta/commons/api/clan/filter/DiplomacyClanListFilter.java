package com.spaiowenta.commons.api.clan.filter;

public class DiplomacyClanListFilter implements ClanListFilter {
  private final DiplomacyClanListFilter$Type type;
  
  public DiplomacyClanListFilter(DiplomacyClanListFilter$Type paramDiplomacyClanListFilter$Type) {
    this.type = paramDiplomacyClanListFilter$Type;
  }
  
  public DiplomacyClanListFilter$Type getType() {
    return this.type;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\filter\DiplomacyClanListFilter.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */