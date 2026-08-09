import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Star, X } from "lucide-react";
import { updateReview } from "../../features/reviews/reviewSlice";


export default function EditReviewModal({ review, listingId, onClose }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(review?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(review?.comment || "");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (rating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }

    setSubmitting(true);

    // Call your update review thunk passing review ID and updated payload
    const result = await dispatch(
      updateReview({
        reviewId: review._id,
        listingId,
        formData: { rating, comment },
      })
    );

    setSubmitting(false);

    if (updateReview.fulfilled.match(result)) {
      onClose();
    } else {
      setErrorMessage(result.payload || "Failed to update review.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-1">Edit Review</h3>
        <p className="text-sm text-gray-500 mb-6">Update your star rating or comments.</p>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
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
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm text-gray-800 resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-700 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl text-sm transition disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}