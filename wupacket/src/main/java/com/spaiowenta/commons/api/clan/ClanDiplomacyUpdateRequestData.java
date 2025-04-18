package com.spaiowenta.commons.api.clan;

public final class ClanDiplomacyUpdateRequestData {
  private final ClanDiplomacyUpdateRequestData$ClanDiplomacyAction clanDiplomacyAction;
  
  private final Integer withClanId;
  
  public ClanDiplomacyUpdateRequestData(ClanDiplomacyUpdateRequestData$ClanDiplomacyAction paramClanDiplomacyUpdateRequestData$ClanDiplomacyAction, Integer paramInteger) {
    this.clanDiplomacyAction = paramClanDiplomacyUpdateRequestData$ClanDiplomacyAction;
    this.withClanId = paramInteger;
  }
  
  public ClanDiplomacyUpdateRequestData$ClanDiplomacyAction getClanDiplomacyAction() {
    return this.clanDiplomacyAction;
  }
  
  public Integer getWithClanId() {
    return this.withClanId;
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\clan\ClanDiplomacyUpdateRequestData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */