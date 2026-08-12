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
    throw new ApiError(400, "Listing Id is invalid!");
  }

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }

  const review = await Review.create({
    rating,
    comment,
    listing: id,
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review created Successfully!"));
});

export const getReviewsByListings = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Listing Id is invalid!");
  }

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ApiError(404, "Listing not  found!");
  }

  const reviews = await Review.find({ listing: id });

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully!"));
});

export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(403, "Review Id is invalid!");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(403, "Review not  found!");
  }

  if (review.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this review!");
  }

  const updatedReview = await Review.findOneAndUpdate(
    { _id: reviewId, author: req.user._id },
    { rating, comment },
    {
      runValidators: true,
      new: true,
    },
  );

  if (!updatedReview) {
    throw new ApiError(404, "Review not found or you are not the owner!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedReview, "Review updated successfully!"));
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(403, "Review Id is invalid!");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(403, "Review not  found!");
  }

  if (review.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this review!");
  }

  const deletedReview = await Review.findOneAndDelete({
    _id: reviewId,
    author: req.user._id,
  });

  if (!deletedReview) {
    throw new ApiError(404, "Review not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Review deleted successfully!"));
});
