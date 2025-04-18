package com.spaiowenta.commons.api.equipment;

import java.util.LinkedHashMap;
import java.util.Map;

import com.spaiowenta.commons.d;

public class ItemInfoResponse {
  @d(a = "itemProperties")
  public Map<String, String> itemProperties = new LinkedHashMap<>();

  public ItemInfoResponse(Map<String, String> paramMap) {
    this.itemProperties = paramMap;
  }

  public ItemInfoResponse() {
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\equipment\
 * ItemInfoResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */