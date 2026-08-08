import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (rating === undefined && !comment?.trim()) {
    throw new ApiError(400, "Rating or comment is required! ");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(403, "Listing Id is invalid!");
  }

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ApiError("403", "Listing not found!");
  }

  const review = await Review.create({
    rating,
    comment,
    listing: id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review created Successfully!"));
});
