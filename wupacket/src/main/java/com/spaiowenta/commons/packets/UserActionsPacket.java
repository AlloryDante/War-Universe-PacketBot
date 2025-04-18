package com.spaiowenta.commons.packets;

public class UserActionsPacket {
  public static class UserAction {
    public static final int MOVE = 1;

    public static final int LOCK = 2;

    public static final int ATTACK = 3;

    public static final int STOP_ATTACK = 4;

    public static final int SWITCH_CONFI = 5;

    public static final int TELEPORT = 6;

    public static final int NBOMB = 7;

    public static final int WSHIELD = 8;

    public static final int EMP = 9;

    public static final int INVIS = 10;

    public static final int LOGOUT = 11;

    public static final int SELECT_LASER = 12;

    public static final int LOGOUT_CANCEL = 13;

    public static final int ENERGY_TRANSFER = 14;

    public static final int FAST_REPAIR = 15;

    public int actionId;

    public String data;
  }

  public UserAction[] actions;
}

/*
 * Location: D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\
 * UserActionsPacket.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */