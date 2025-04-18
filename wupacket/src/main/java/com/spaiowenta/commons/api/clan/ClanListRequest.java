package com.spaiowenta.commons.api.clan;

import java.util.List;

import com.spaiowenta.commons.d;

public final class ClanListRequest {
  @d(a = "sortingType")
  private final ClanListRequest$ClanListSortingType clanListSortingType;

  private final int page;

  private final List<ClanListRequest$ClanListFilter> clanListFilters;

  public ClanListRequest(ClanListRequest$ClanListSortingType paramClanListRequest$ClanListSortingType, int paramInt,
      List<ClanListRequest$ClanListFilter> paramList) {
    this.clanListSortingType = paramClanListRequest$ClanListSortingType;
    this.page = paramInt;
    this.clanListFilters = paramList;
  }

  public ClanListRequest$ClanListSortingType getClanListSortingType() {
    return this.clanListSortingType;
  }

  public int getPage() {
    return this.page;
  }

  public List<ClanListRequest$ClanListFilter> getClanListFilters() {
    return this.clanListFilters;
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\
 * ClanListRequest.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */