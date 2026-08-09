import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Star } from "lucide-react"; // npm install lucide-react (or use your preferred icon library)
import { createReview } from "../../../features/reviews/reviewSlice";

const ReviewForm = ({ listing }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (rating === 0) {
      setErrorMessage("Please select a star rating");
      return;
    }

    setSubmitting(true);

    const result = await dispatch(
      createReview({
        formData: { rating, comment },
        id: listing._id,
      }),
    );

    setSubmitting(false);

    if (createReview.fulfilled.match(result)) {
      setComment("");
      setRating(0);
    } else {
      setErrorMessage(result.payload || "Failed to submit review");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        Leave a Review
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Share your experience staying at this place to help future guests.
      </p>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmitReview} className="space-y-5">
        {/* Interactive Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-rose-500 text-rose-500"
                      : "fill-gray-100 text-gray-300"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-600">
                {rating} out of 5
              </span>
            )}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you enjoy about your stay? How was the cleanliness, location, and host communication?"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm text-gray-800 placeholder-gray-400 resize-none transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
