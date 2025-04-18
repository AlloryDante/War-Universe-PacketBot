package com.spaiowenta.commons.api.hangar;

import com.spaiowenta.commons.ad;

public enum HangarPurchaseStatus {
  SUCCESS, SAFEZONE_REQUIRED, REPAIR_REQUIRED, NOT_ENOUGH_MONEY, UNKNOWN;

  public static HangarPurchaseStatus getStatusByActionStatus(int paramInt) {
    return (paramInt == ad.g) ? SAFEZONE_REQUIRED
        : ((paramInt == ad.h) ? REPAIR_REQUIRED : ((paramInt == ad.c) ? NOT_ENOUGH_MONEY : UNKNOWN));
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\hangar\
 * HangarPurchaseStatus.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */