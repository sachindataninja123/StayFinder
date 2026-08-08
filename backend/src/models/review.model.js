import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  },
  {
    timestamps: true,
  },
);

const Review = new mongoose.model("Review", reviewSchema);

export default Review;
