package com.spaiowenta.commons.api;

import com.spaiowenta.commons.api.adrewarder.AdRewarderCompleteEndpoint;
import com.spaiowenta.commons.api.adrewarder.AdRewarderListEndpoint;
import com.spaiowenta.commons.api.analytics.AnalyticsInfoEndpoint;
import com.spaiowenta.commons.api.auction.AuctionBidEndpoint;
import com.spaiowenta.commons.api.auction.AuctionHistoryEndpoint;
import com.spaiowenta.commons.api.auction.AuctionLotsEndpoint;
import com.spaiowenta.commons.api.auth.AuthSignInEndpoint;
import com.spaiowenta.commons.api.auth.AuthTokenLoginEndpoint;
import com.spaiowenta.commons.api.clan.ClanDiplomacyListEndpoint;
import com.spaiowenta.commons.api.clan.ClanDiplomacyUpdateEndpoint;
import com.spaiowenta.commons.api.clan.ClanEditEndpoint;
import com.spaiowenta.commons.api.clan.ClanListEndpoint;
import com.spaiowenta.commons.api.clan.ClanMemberListEndpoint;
import com.spaiowenta.commons.api.equipment.EquipmentSettingsGetEndpoint;
import com.spaiowenta.commons.api.equipment.EquipmentSettingsSetEndpoint;
import com.spaiowenta.commons.api.equipment.ItemInfoEndpoint;
import com.spaiowenta.commons.api.equipment.MoveEquipmentEndpoint;
import com.spaiowenta.commons.api.hangar.HangarCostEndpoint;
import com.spaiowenta.commons.api.hangar.HangarPurchaseWithShipEndpoint;
import com.spaiowenta.commons.api.iapstore.IapStoreBuyItemEndpoint;
import com.spaiowenta.commons.api.iapstore.IapStoreFreePackStateEndpoint;
import com.spaiowenta.commons.api.iapstore.IapStoreItemsEndpoint;
import com.spaiowenta.commons.api.missions.MissionsMinerActivationEndpoint;
import com.spaiowenta.commons.api.onboarding.OnboardingCPanelViewedGetEndpoint;
import com.spaiowenta.commons.api.onboarding.OnboardingCPanelViewedSetEndpoint;
import com.spaiowenta.commons.api.platinumbank.PlatinumBankBuyoutEndpoint;
import com.spaiowenta.commons.api.platinumbank.PlatinumBankInfoEndpoint;
import com.spaiowenta.commons.api.player.PlayerRoleEndpoint;
import com.spaiowenta.commons.api.quest.PrioritizeQuestEndpoint;
import com.spaiowenta.commons.api.review.ReviewEndpoint;
import com.spaiowenta.commons.api.sales.DiscountInfoEndpoint;
import com.spaiowenta.commons.api.shop.ShopBuyItemEndpoint;
import com.spaiowenta.commons.api.shop.ShopItemsEndpoint;
import com.spaiowenta.commons.api.starterpack.StarterPackDropLastChanceEndpoint;
import com.spaiowenta.commons.api.starterpack.StarterPackInfoEndpoint;
import com.spaiowenta.commons.api.tutorial.TutorialPopupViewedSetEndpoint;

public class WuApi {
  public static final AuthSignInEndpoint AUTH_SIGN_IN = new AuthSignInEndpoint("auth/signin");
  
  public static final AuthTokenLoginEndpoint AUTH_TOKEN_LOGIN = new AuthTokenLoginEndpoint("auth/token-login");
  
  public static final AnalyticsInfoEndpoint ANALYTICS_INFO = new AnalyticsInfoEndpoint("analytics/info");
  
  public static final PlayerRoleEndpoint PLAYER_ROLE = new PlayerRoleEndpoint("player/role");
  
  public static final PlatinumBankInfoEndpoint PLATINUM_BANK_INFO = new PlatinumBankInfoEndpoint("platinumbank/info");
  
  public static final PlatinumBankBuyoutEndpoint PLATINUM_BANK_BUYOUT = new PlatinumBankBuyoutEndpoint("platinumbank/buyout");
  
  public static final AuctionLotsEndpoint AUCTION_LOTS = new AuctionLotsEndpoint("auction/lots");
  
  public static final AuctionBidEndpoint AUCTION_BID = new AuctionBidEndpoint("auction/bid");
  
  public static final AuctionHistoryEndpoint AUCTION_HISTORY = new AuctionHistoryEndpoint("auction/history");
  
  public static final ShopItemsEndpoint SHOP_ITEMS = new ShopItemsEndpoint("shop/items");
  
  public static final ShopBuyItemEndpoint SHOP_BUY_ITEM = new ShopBuyItemEndpoint("shop/buy");
  
  public static final ClanListEndpoint CLAN_LIST = new ClanListEndpoint("clan/list");
  
  @Deprecated
  public static final ClanDiplomacyListEndpoint CLAN_DIPLOMACY_LIST = new ClanDiplomacyListEndpoint("clan/diplomacy/list");
  
  public static final ClanDiplomacyUpdateEndpoint CLAN_DIPLOMACY_UPDATE = new ClanDiplomacyUpdateEndpoint("clan/diplomacy/update");
  
  public static final ClanMemberListEndpoint CLAN_MEMBER_LIST = new ClanMemberListEndpoint("clan/member/list");
  
  public static final ClanEditEndpoint CLAN_EDIT = new ClanEditEndpoint("clan/edit");
  
  public static final PrioritizeQuestEndpoint PRIORITIZE_QUEST = new PrioritizeQuestEndpoint("quest/prioritize");
  
  public static final ReviewEndpoint INTERNAL_REVIEW = new ReviewEndpoint("internal/review");
  
  public static final IapStoreItemsEndpoint IAP_STORE_ITEMS = new IapStoreItemsEndpoint("iapstore/items");
  
  public static final IapStoreBuyItemEndpoint IAP_STORE_BUY_ITEM = new IapStoreBuyItemEndpoint("iapstore/buy");
  
  public static final IapStoreFreePackStateEndpoint IAP_STORE_FREE_PACK_STATE = new IapStoreFreePackStateEndpoint("iapstore/freepack");
  
  public static final MoveEquipmentEndpoint MOVE_EQUIPMENT = new MoveEquipmentEndpoint("equipment/move");
  
  public static final OnboardingCPanelViewedGetEndpoint ONBOARDING_CPANEL_VIEWED_GET = new OnboardingCPanelViewedGetEndpoint("onboarding/cpanel/viewed/get");
  
  public static final OnboardingCPanelViewedSetEndpoint ONBOARDING_CPANEL_VIEWED_SET = new OnboardingCPanelViewedSetEndpoint("onboarding/cpanel/viewed/set");
  
  public static final ItemInfoEndpoint ITEM_INFO = new ItemInfoEndpoint("equipment/items/info");
  
  public static final EquipmentSettingsGetEndpoint EQUIPMENT_SETTINGS_GET = new EquipmentSettingsGetEndpoint("equipment/settings/get");
  
  public static final EquipmentSettingsSetEndpoint EQUIPMENT_SETTINGS_SET = new EquipmentSettingsSetEndpoint("equipment/settings/set");
  
  public static final AdRewarderCompleteEndpoint ADREWARDER_COMPLETE = new AdRewarderCompleteEndpoint("adrewarder/complete");
  
  public static final AdRewarderListEndpoint ADREWARDER_LIST = new AdRewarderListEndpoint("adrewarder/list");
  
  public static final StarterPackInfoEndpoint STARTER_PACK_INFO = new StarterPackInfoEndpoint("starterpack/info");
  
  public static final StarterPackDropLastChanceEndpoint STARTER_PACK_DROP_LAST_CHANCE = new StarterPackDropLastChanceEndpoint("starterpack/droplastchance");
  
  public static final DiscountInfoEndpoint DISCOUNT_INFO = new DiscountInfoEndpoint("sales/info");
  
  public static final HangarCostEndpoint HANGAR_COST = new HangarCostEndpoint("hangar/cost");
  
  public static final HangarPurchaseWithShipEndpoint HANGAR_PURCHASE_WITH_SHIP = new HangarPurchaseWithShipEndpoint("hangar/purchase-with-ship");
  
  public static final TutorialPopupViewedSetEndpoint TUTORIAL_POPUP_VIEWED_SET = new TutorialPopupViewedSetEndpoint("tutorial/popup/viewed/set");
  
  public static final MissionsMinerActivationEndpoint MISSIONS_MINER_ACTIVATION = new MissionsMinerActivationEndpoint("missions/miner/activation");
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\WuApi.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */