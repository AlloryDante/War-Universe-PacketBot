package com.spaiowenta.commons.json;

import java.util.Arrays;
import java.util.Locale;
import java.util.Map;
import org.jetbrains.annotations.Nullable;

import com.spaiowenta.commons.d;

public class a {
  @d(a = "uid")
  @Nullable
  public String a;

  @d(a = "build")
  public Integer b;

  @d(a = "version")
  public int[] c;

  @d(a = "platform")
  @Nullable
  public String d;

  @d(a = "systemLocale")
  @Nullable
  public Locale e;

  @d(a = "preferredLocale")
  @Nullable
  public Locale f;

  @d(a = "locale")
  @Deprecated
  @Nullable
  public String g;

  @d(a = "language")
  @Deprecated
  @Nullable
  public String h;

  @d(a = "clientHash")
  @Nullable
  public String i;

  @d(a = "conversionData")
  @Nullable
  public Map<String, Object> j;

  public String toString() {
    return "ClientInfoPacket(uid=" + this.a + ", build=" + this.b + ", version=" + Arrays.toString(this.c)
        + ", platform=" + this.d + ", systemLocale=" + this.e + ", preferredLocale=" + this.f + ", locale=" + this.g
        + ", language=" + this.h + ", clientHash=" + this.i + ", conversionData=" + this.j + ")";
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\json\a.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */