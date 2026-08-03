import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "../features/listings/listingSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});
