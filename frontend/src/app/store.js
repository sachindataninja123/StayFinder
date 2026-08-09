import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "../features/listings/listingSlice";
import reviewsReducer from "../features/reviews/reviewSlice"

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    reviews : reviewsReducer,
  },
});
