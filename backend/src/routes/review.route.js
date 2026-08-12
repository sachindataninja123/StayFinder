import express from "express";
import {
  createReview,
  deleteReview,
  getReviewsByListings,
  updateReview,
} from "../controllers/review.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/:id/create", isAuth, createReview);
reviewRouter.get("/:id", getReviewsByListings);
reviewRouter.patch("/:reviewId/update", isAuth, updateReview);
reviewRouter.delete("/:reviewId", isAuth, deleteReview);

export default reviewRouter;
