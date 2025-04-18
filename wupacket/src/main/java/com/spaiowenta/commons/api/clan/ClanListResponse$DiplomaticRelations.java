package com.spaiowenta.commons.api.clan;

import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.NotNull;

import com.spaiowenta.commons.d;

public class ClanListResponse$DiplomaticRelations {
  @d(a = "fromClanId")
  public Integer fromClanId;

  @d(a = "toClanId")
  public Integer toClanId;

  @d(a = "diplomaticRelationsType")
  @NotNull
  public ClanListResponse$DiplomaticRelationsType diplomaticRelationsType;

  @d(a = "diplomaticRelationsStatus")
  @NotNull
  public ClanListResponse$DiplomaticRelationsStatus diplomaticRelationsStatus;

  @d(a = "diplomaticRelationsPossibleActions")
  @NotNull
  public List<ClanListResponse$DiplomaticRelationsPossibleAction> diplomaticRelationsPossibleActions = new ArrayList<>();
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\
 * ClanListResponse$DiplomaticRelations.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */