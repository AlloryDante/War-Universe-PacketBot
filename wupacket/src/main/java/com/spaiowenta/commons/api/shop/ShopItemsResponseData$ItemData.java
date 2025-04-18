package com.spaiowenta.commons.api.shop;

import java.util.LinkedHashMap;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import com.spaiowenta.commons.d;

public class ShopItemsResponseData$ItemData {
  @d(a = "itemId")
  public int itemId;

  @d(a = "itemKindId")
  @Nullable
  public String itemKindId = null;

  @d(a = "title")
  @NotNull
  public String title = "Unknown";

  @d(a = "shortTitle")
  @NotNull
  public String shortTitle = "Unknown";

  @d(a = "description")
  @NotNull
  public String description = "Unknown";

  @d(a = "itemProperties")
  @NotNull
  public LinkedHashMap<String, String> itemProperties = new LinkedHashMap<>();

  @d(a = "currencyKindId")
  @NotNull
  public String currencyKindId = "";

  @d(a = "price")
  public int price = 0;

  @d(a = "priceString")
  @NotNull
  public String priceString = "0";

  @d(a = "category")
  @NotNull
  public String category = "Unknown";

  @d(a = "quantity")
  public int quantity = 1;
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\shop\
 * ShopItemsResponseData$ItemData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */