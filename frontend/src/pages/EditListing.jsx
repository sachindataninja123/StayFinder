import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getListingById,
  updateListing,
  updateListingImage,
} from "../features/listings/listingSlice";
export default function EditListing() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedListing, loading, error } = useSelector(
    (state) => state.listings || {},
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

 
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [detailsLoading, setDetailsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getListingById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedListing) {
      setFormData({
        title: selectedListing.title || "",
        description: selectedListing.description || "",
        price: selectedListing.price || "",
        location: selectedListing.location || "",
        country: selectedListing.country || "",
      });
      if (selectedListing.image?.url) {
        setImagePreview(selectedListing.image.url);
      }
    }
  }, [selectedListing]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    setSuccessMessage("");

    try {
      const result = await dispatch(updateListing({ id, formData }));
      if (updateListing.fulfilled.match(result)) {
        setSuccessMessage("Listing details updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update details:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  // 2. Submit image update
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    setImageLoading(true);
    setSuccessMessage("");

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

    try {
      const result = await dispatch(
        updateListingImage({ id, formData: imageFormData }),
      );
      if (updateListingImage.fulfilled.match(result)) {
        setSuccessMessage("Listing image updated successfully!");
        setImageFile(null); 
      }
    } catch (err) {
      console.error("Failed to update image:", err);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          &larr; Back
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Image Section */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 border rounded-2xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Listing Image
            </h2>

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Listing Preview"
                className="w-full h-48 object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                No Image Selected
              </div>
            )}

            <form onSubmit={handleImageSubmit} className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />

              <button
                type="submit"
                disabled={!imageFile || imageLoading}
                className="w-full py-2 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
              >
                {imageLoading ? "Uploading..." : "Update Image"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Text Details Section */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleDetailsSubmit}
            className="bg-white p-6 border rounded-2xl shadow-sm space-y-5"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Property Details
            </h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (per night)
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
              />
            </div>

            {/* Location & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Save Details Button */}
            <button
              type="submit"
              disabled={detailsLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 text-sm"
            >
              {detailsLoading ? "Saving Changes..." : "Save Details"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
