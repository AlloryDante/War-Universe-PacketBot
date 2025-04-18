package com.spaiowenta.commons.api.player;

public final class PlayerRoleResponse {
  private final PlayerRoleResponse$PlayerRole playerRole;

  public PlayerRoleResponse(PlayerRoleResponse$PlayerRole paramPlayerRoleResponse$PlayerRole) {
    this.playerRole = paramPlayerRoleResponse$PlayerRole;
  }

  public PlayerRoleResponse$PlayerRole getPlayerRole() {
    return this.playerRole;
  }

  public boolean equals(Object paramObject) {
    if (paramObject == this)
      return true;
    if (!(paramObject instanceof PlayerRoleResponse))
      return false;
    PlayerRoleResponse playerRoleResponse = (PlayerRoleResponse) paramObject;
    PlayerRoleResponse$PlayerRole playerRoleResponse$PlayerRole1 = getPlayerRole();
    PlayerRoleResponse$PlayerRole playerRoleResponse$PlayerRole2 = playerRoleResponse.getPlayerRole();
    return !((playerRoleResponse$PlayerRole1 == null) ? (playerRoleResponse$PlayerRole2 != null)
        : !playerRoleResponse$PlayerRole1.equals(playerRoleResponse$PlayerRole2));
  }

  // public int hashCode() {
  // byte b = 59;
  // null = 1;
  // PlayerRoleResponse$PlayerRole playerRoleResponse$PlayerRole =
  // getPlayerRole();
  // return null * 59 + ((playerRoleResponse$PlayerRole == null) ? 43 :
  // playerRoleResponse$PlayerRole.hashCode());
  // }

  public String toString() {
    return "PlayerRoleResponse(playerRole=" + getPlayerRole() + ")";
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\player\
 * PlayerRoleResponse.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */