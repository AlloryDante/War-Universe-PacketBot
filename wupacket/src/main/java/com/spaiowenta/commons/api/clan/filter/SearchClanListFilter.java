package com.spaiowenta.commons.api.clan.filter;

public class SearchClanListFilter implements ClanListFilter {
  private final String input;
  
  public SearchClanListFilter(String paramString) {
    this.input = paramString;
  }
  
  public String getInput() {
    return this.input;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\filter\SearchClanListFilter.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */