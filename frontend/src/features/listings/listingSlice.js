import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListings as getListingsApi,
  getListingById as getListingByIdApi,
  createListing as createListingApi,
  updateListing as updateListingApi,
  deleteListing as deleteListingApi,
  updateListingImage as updateListingImageApi,
} from "../../services/listing.service"; 


export const getListings = createAsyncThunk(
  "listings/getListings",
  async (_, thunkAPI) => {
    try {
      const res = await getListingsApi();
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getListingById = createAsyncThunk(
  "listings/getListingById",
  async (id, thunkAPI) => {
    try {
      const res = await getListingByIdApi(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (formData, thunkAPI) => {
    try {
      const res = await createListingApi(formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await updateListingApi({ id, formData });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (id, thunkAPI) => {
    try {
      await deleteListingApi(id);
      return id; // just return the id so we know what to remove from state
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateListingImage = createAsyncThunk(
  "listings/updateListingImage",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await updateListingImageApi({ id, formData });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ---------- Slice ----------

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    items: [],
    selectedListing: null,
    loading: false,
    error: null,
    actionLoading: false, // for create/update/delete (separate from list fetch)
    actionError: null,
  },
  reducers: {
    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },
    clearListingError: (state) => {
      state.error = null;
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getListings
      .addCase(getListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getListingById
      .addCase(getListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedListing = action.payload;
      })
      .addCase(getListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createListing
      .addCase(createListing.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items.unshift(action.payload); // add new listing to top of list
      })
      .addCase(createListing.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // updateListing
      .addCase(updateListing.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        if (state.selectedListing?._id === action.payload._id) {
          state.selectedListing = action.payload;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // deleteListing
      .addCase(deleteListing.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // updateListingImage
      .addCase(updateListingImage.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateListingImage.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        if (state.selectedListing?._id === action.payload._id) {
          state.selectedListing = action.payload;
        }
      })
      .addCase(updateListingImage.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearSelectedListing, clearListingError } =
  listingsSlice.actions;

export default listingsSlice.reducer;