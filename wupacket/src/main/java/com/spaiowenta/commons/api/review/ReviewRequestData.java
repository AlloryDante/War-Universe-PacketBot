package com.spaiowenta.commons.api.review;

import org.jetbrains.annotations.Nullable;

import com.spaiowenta.commons.d;

public class ReviewRequestData {
  public static final int RATE_UNDEFINED = -1;

  @d(a = "rate")
  private int rate = -1;

  @d(a = "reviewText")
  @Nullable
  private String reviewText;

  public void setReviewRate(int paramInt) {
    this.rate = paramInt;
  }

  public void setReviewText(String paramString) {
    this.reviewText = paramString;
  }

  public int getRate() {
    return this.rate;
  }

  @Nullable
  public String getReviewText() {
    return this.reviewText;
  }
}

/*
 * Location:
 * D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\review\
 * ReviewRequestData.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version: 1.1.3
 */