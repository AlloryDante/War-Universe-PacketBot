package com.spaiowenta.commons.api.review;

import com.spaiowenta.commons.api.ApiEndpoint;
import com.spaiowenta.commons.api.ApiMessageResponse;

public class ReviewEndpoint extends ApiEndpoint<ReviewRequestData, ApiMessageResponse> {
  public ReviewEndpoint(String paramString) {
    super(paramString, ReviewRequestData.class, ApiMessageResponse.class);
  }
}


/* Location:              D:\Desktop\WarUniverse.1.215.0.jar!\com\spaiowenta\commons\api\review\ReviewEndpoint.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */