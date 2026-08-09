import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addReview,
  getReviews,
  updateReviews,
  deleteReviews,
} from "../../services/review.service";

// Thunks

export const createReview = createAsyncThunk(
  "reviews/create",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const result = await addReview({ formData, id });
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchReviews = createAsyncThunk(
  "reviews/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const result = await getReviews(id);
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const editReview = createAsyncThunk(
  "reviews/update",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      return await updateReviews({ formData, id });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeReview = createAsyncThunk(
  "reviews/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteReviews(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Slice

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(editReview.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.reviews.findIndex((r) => r._id === updated._id);
        if (index !== -1) state.reviews[index] = updated;
      })
      .addCase(editReview.rejected, (state, action) => {
        state.error = action.payload;
      })

      // delete
      .addCase(removeReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;
