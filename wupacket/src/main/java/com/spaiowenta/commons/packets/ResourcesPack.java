package com.spaiowenta.commons.packets;

public class ResourcesPack {
  private int[] amounts = new int[9];

  public void set(int paramInt1, int paramInt2) {
    this.amounts[paramInt1] = paramInt2;
  }

  public int get(int paramInt) {
    return this.amounts[paramInt];
  }

  public int[] getRaw() {
    return this.amounts;
  }

  public boolean isEmpty() {
    for (int i : this.amounts) {
      if (i > 0)
        return false;
    }
    return true;
  }
}

/*
 * Location: D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\
 * ResourcesPack.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */