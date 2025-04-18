package com.spaiowenta.commons.packets;

import com.spaiowenta.commons.api.ApiNotification;
import com.spaiowenta.commons.api.ApiRequestPacket;
import com.spaiowenta.commons.api.ApiResponseNetStatus;
import com.spaiowenta.commons.api.ApiResponsePacket;
import com.spaiowenta.commons.packets.auction.AuctionNetPacket;
import com.spaiowenta.commons.packets.auction.AuctionNotificationNetPacket;
import com.spaiowenta.commons.packets.chat.ChatNetPacket;
import com.spaiowenta.commons.packets.squads.SquadsNetPacket;
import java.util.ArrayList;

public class ClientPackets {
  public static Class<?>[] getPacketsToRegister() {
    ArrayList<Class<?>> arrayList = new ArrayList();
    arrayList.add(SquadsNetPacket.class);
    arrayList.add(ChatNetPacket.class);
    arrayList.add(ClientOnPausePacket.class);
    arrayList.add(ClientOnResumePacket.class);
    arrayList.add(AuctionNetPacket.class);
    arrayList.add(AuctionNotificationNetPacket.class);
    arrayList.add(ClientInfoNetPacket.class);
    arrayList.add(ApiRequestPacket.class);
    arrayList.add(ApiResponseNetStatus.class);
    arrayList.add(ApiResponsePacket.class);
    arrayList.add(ApiNotification.class);
    // return (Class[]) arrayList.<Class<?>[]>toArray((Class<?>[][]) new Class[0]);
    return arrayList.toArray(new Class<?>[0]);
  }
}

/*
 * Location: D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\packets\
 * ClientPackets.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */