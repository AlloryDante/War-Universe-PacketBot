package com.wupacketbot;

import com.esotericsoftware.kryonet.Client;
import com.esotericsoftware.kryonet.EndPoint;

class RegisterHook extends Client {
    RegisterHook() {
        super(200000, 327680);
        PacketHook.a((EndPoint) this);
    }
}