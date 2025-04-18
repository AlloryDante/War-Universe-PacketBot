package com.spaiowenta.commons.api.iapstore;

import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.NotNull;

import com.spaiowenta.commons.d;

public class IapStoreItemsResponseData$GroupData {
  @d(a = "id")
  @NotNull
  public String id = "none";

  @d(a = "title")
  @NotNull
  public String title = "Unknown";

  @d(a = "items")
  @NotNull
  public List<IapStoreItemsResponseData$ItemData> items = new ArrayList<>();
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\iapstore\
 * IapStoreItemsResponseData$GroupData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */