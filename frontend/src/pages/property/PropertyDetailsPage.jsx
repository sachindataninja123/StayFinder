import React, { useState, useEffect } from "react";
import {
  Star,
  ShieldCheck,
  MapPin,
  Heart,
  Share,
  ArrowLeft,
  Check,
  CheckCircle2,
  Trash,
  Edit,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getListingById,
  clearSelectedListing,
  deleteListing,
} from "../../features/listings/listingSlice";
import ReviewForm from "./components/ReviewForm";
import {
  clearReviewError,
  fetchReviews,
} from "../../features/reviews/reviewSlice";
import { deleteReviews } from "../../services/review.service";
import ReviewItem from "./components/ReviewItem";

export function PropertyDetailsPage() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [editingReview, setEditingReview] = useState(null);

  const { selectedListing, loading, error } = useSelector(
    (state) => state.listings,
  );

  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getListingById(id));
    return () => dispatch(clearSelectedListing());
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchReviews(id));
    return () => dispatch(clearReviewError());
  }, [id, dispatch]);

  const { reviews } = useSelector((state) => state.reviews);

  console.log(reviews);

  const handleDeleteReview = async (reviewId) => {
    try {
      const result = await dispatch(deleteReviews(reviewId));

      if (deleteReviews.fulfilled.match(result)) {
        alert("review delete successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(deleteListing(id));

      if (deleteListing.fulfilled.match(result)) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedListing) return <p>Loading...</p>;

  // Safe fallback: use `images` array if it exists, otherwise wrap single `image.url`
  const images =
    selectedListing.images && selectedListing.images.length > 0
      ? selectedListing.images
      : selectedListing.image?.url
        ? [selectedListing.image.url]
        : [];

  const nights = 5;
  const cleaningFee = 120;
  const serviceFee = 85;
  const subtotal = (selectedListing.price || 0) * nights;
  const total = subtotal + cleaningFee + serviceFee;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 animate-in fade-in duration-300 font-sans text-slate-900">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between pb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to search</span>
        </button>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <button className="flex items-center gap-1.5 hover:underline">
            <Share className="h-4 w-4" /> Share
          </button>
          <button className="flex items-center gap-1.5 hover:underline">
            <Heart className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      {/* Title & Metadata */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {selectedListing.title}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-red-100 hover:bg-red-600 text-black px-2 py-2 rounded-full text-sm transition cursor-pointer hover:text-white"
            >
              <Trash size={20} />
            </button>
            <Link
              to={`/listings/${id}/edit`}
              className="bg-blue-200 hover:bg-blue-500 text-black px-2 py-2 rounded-full text-sm transition cursor-pointer hover:text-white"
            >
              <Edit size={20} />
            </Link>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1 font-semibold text-slate-900">
            <Star className="h-4 w-4 fill-slate-900 text-slate-900" />
            <span>{selectedListing.rating ?? "New"}</span>
            {selectedListing.reviewsCount !== undefined && (
              <span className="text-slate-400 font-normal">
                ({selectedListing.reviewsCount} reviews)
              </span>
            )}
          </div>
          <span>·</span>
          {selectedListing.isSuperhost && (
            <>
              <span className="flex items-center gap-1 font-medium text-slate-900">
                <ShieldCheck className="h-4 w-4 text-rose-500" /> Superhost
              </span>
              <span>·</span>
            </>
          )}
          <span className="underline font-medium">
            {selectedListing.location}
          </span>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      {images.length > 0 && (
        <div
          className={`mt-6 gap-3 overflow-hidden rounded-3xl ${
            images.length === 1 ? "w-full" : "grid grid-cols-1 md:grid-cols-4"
          }`}
        >
          {/* Main Image */}
          <div
            className={`${
              images.length === 1
                ? "w-full h-80 md:h-100"
                : "md:col-span-2 h-64 md:h-100"
            }`}
          >
            <img
              src={images[0]}
              alt="Main"
              className="h-full w-full object-cover rounded-2xl md:rounded-3xl"
            />
          </div>

          {/* Secondary Grid (Visible only if > 1 image) */}
          {images.length > 1 && (
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-100">
              {images.slice(1, 5).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="h-48.5 w-full object-cover rounded-2xl"
                />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Page Content Layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Info Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Entire villa hosted by {selectedListing.hostName || "Host"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedListing.guests ?? "—"} guests ·{" "}
                {selectedListing.bedrooms ?? "—"} bedrooms ·{" "}
                {selectedListing.beds ?? "—"} beds ·{" "}
                {selectedListing.baths ?? "—"} baths
              </p>
            </div>
            {selectedListing.hostImage && (
              <img
                src={selectedListing.hostImage}
                alt="Host"
                className="h-14 w-14 rounded-full object-cover shadow-sm"
              />
            )}
          </div>

          {/* Highlights */}
          <div className="space-y-4 border-b border-slate-100 pb-6 text-sm">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-slate-700 mt-1" />
              <div>
                <p className="font-bold text-slate-900">
                  {selectedListing.hostName || "Host"} is a Superhost
                </p>
                <p className="text-slate-500">
                  Superhosts are experienced, highly rated hosts committed to
                  great stays.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-slate-700 mt-1" />
              <div>
                <p className="font-bold text-slate-900">Great Location</p>
                <p className="text-slate-500">
                  95% of recent guests gave the location a 5-star rating.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-slate-100 pb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              About this space
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {selectedListing.description}
            </p>
          </div>

          {/* Amenities */}
          {selectedListing.amenities?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedListing.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Checkout Widget */}
        <div className="relative">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-slate-900">
                  ₹{Number(selectedListing.price).toLocaleString("en-IN")}
                </span>
                <span className="text-slate-500 text-sm"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                <Star className="h-4 w-4 fill-slate-900 text-slate-900" />
                <span>{selectedListing.rating ?? "New"}</span>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-100">
                <Check className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="mt-2 font-bold text-emerald-900">
                  Reservation Confirmed!
                </h4>
                <p className="mt-1 text-xs text-emerald-700">
                  Confirmation emailed to your account.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
                  <div className="grid grid-cols-2 border-b border-slate-200">
                    <div className="p-3 border-r border-slate-200">
                      <p className="font-bold uppercase text-slate-500">
                        Check-In
                      </p>
                      <p className="font-semibold text-slate-800 text-sm mt-1">
                        Oct 12, 2026
                      </p>
                    </div>
                    <div className="p-3">
                      <p className="font-bold uppercase text-slate-500">
                        Checkout
                      </p>
                      <p className="font-semibold text-slate-800 text-sm mt-1">
                        Oct 17, 2026
                      </p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-bold uppercase text-slate-500">Guests</p>
                    <p className="font-semibold text-slate-800 text-sm mt-1">
                      2 guests
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setBookingSuccess(true)}
                  className="w-full rounded-xl bg-rose-500 py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-rose-600"
                >
                  Reserve
                </button>
                <div className="space-y-2 text-sm text-slate-600 pt-2">
                  <div className="flex justify-between">
                    <span>
                      ₹{selectedListing.price.toLocaleString("en-IN")} ×{" "}
                      {nights} nights
                    </span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>₹{cleaningFee.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>StayHaven service fee</span>
                    <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between border-t border-slate-100 pt-3 font-bold text-slate-900 text-base">
                    <span>Total before taxes</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Delete Property?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews section */}
      <div className="mt-12 border-t border-slate-200 pt-8 space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">Guest Reviews</h2>

        <ReviewForm listing={selectedListing} />

        {/* Display existing reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews && reviews.length > 0 ? (
            reviews.map((rev) => (
              <ReviewItem
                key={rev._id}
                review={rev}
                currentUserId={user?._id}
                onEdit={(reviewToEdit) => setEditingReview(reviewToEdit)}
                onDelete={handleDeleteReview}
              />
            ))
          ) : (
            <p className="text-slate-500 text-sm">
              No reviews yet. Be the first to leave one!
            </p>
          )}
        </div>
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <EditReviewModal
          review={editingReview}
          listingId={id}
          onClose={() => setEditingReview(null)}
        />
      )}
    </div>
  );
}

export default PropertyDetailsPage;
