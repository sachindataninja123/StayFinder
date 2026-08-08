import express from "express";
import {
  createReview,
  deleteReview,
  getReviewsByListings,
  updateReview,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/:id/create", createReview);
reviewRouter.get("/:id", getReviewsByListings);
reviewRouter.patch("/:reviewId/update", updateReview);
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
