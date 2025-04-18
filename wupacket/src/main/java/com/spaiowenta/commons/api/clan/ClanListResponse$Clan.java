package com.spaiowenta.commons.api.clan;

import org.jetbrains.annotations.NotNull;

import com.spaiowenta.commons.d;

public class ClanListResponse$Clan {
  @d(a = "id")
  public int id = 0;

  @d(a = "factionKindId")
  @NotNull
  public String factionKindId = "";

  @d(a = "name")
  @NotNull
  public String name = "Unknown";

  @d(a = "tag")
  @NotNull
  public String tag = "Unknown";

  @d(a = "leader")
  @NotNull
  public String leader = "Unknown";

  @d(a = "creationDate")
  @NotNull
  public String creationDate = "Unknown";

  @d(a = "membersNumber")
  public int membersNumber = 0;

  @d(a = "score")
  public long score = 0L;

  @d(a = "diplomaticRelations")
  public ClanListResponse$DiplomaticRelations diplomaticRelations;
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\
 * ClanListResponse$Clan.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */