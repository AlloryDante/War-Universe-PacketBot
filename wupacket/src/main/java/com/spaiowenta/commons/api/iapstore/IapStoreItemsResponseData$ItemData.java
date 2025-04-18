package com.spaiowenta.commons.api.iapstore;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import com.spaiowenta.commons.d;

public class IapStoreItemsResponseData$ItemData {
  @d(a = "externalItemSkuId")
  @Nullable
  public String externalItemSkuId = null;

  @d(a = "itemId")
  public int itemId;

  @d(a = "itemKindId")
  @NotNull
  public String itemKindId = "";

  @d(a = "title")
  @NotNull
  public String title = "Unknown";

  @d(a = "description")
  @NotNull
  public String description = "Unknown";

  @d(a = "currencyKindId")
  @NotNull
  public String currencyKindId = "";

  @d(a = "price")
  public int price;

  @d(a = "priceString")
  @NotNull
  public String priceString = "0";

  @d(a = "hasDiscount")
  public boolean hasDiscount = false;

  @d(a = "discountPercent")
  public int discountPercent;

  @d(a = "priceWithoutDiscount")
  @NotNull
  public String priceWithoutDiscount = "0";

  @d(a = "offerTimeLeftSeconds")
  public long offerTimeLeftSeconds = 0L;

  @d(a = "offersLeft")
  public int offersLeft = 0;
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\iapstore\
 * IapStoreItemsResponseData$ItemData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */