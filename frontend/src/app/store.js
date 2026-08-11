import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "../features/listings/listingSlice";
import reviewsReducer from "../features/reviews/reviewSlice";
import authReducer from "../features/auth/auth.slice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    reviews: reviewsReducer,
    auth: authReducer,
  },
});
