package com.spaiowenta.commons.api.clan;

import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.NotNull;

import com.spaiowenta.commons.d;

public final class ClanListResponse {
  @d(a = "clanDataList")
  @NotNull
  public List<ClanListResponse$Clan> clanDataList = new ArrayList<>();

  @d(a = "pageNumbers")
  public int pageNumbers = 1;

  @d(a = "requestPage")
  public int requestPage = 0;
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\
 * ClanListResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */