import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createListing } from "../features/listings/listingSlice";

export default function CreateListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.listings || {}
  );

  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) {
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("country", formData.country);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const result = await dispatch(createListing(data));

      if (createListing.fulfilled.match(result)) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to create listing:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Create a New Listing
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
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
            placeholder="e.g. Cozy Beachfront Cottage"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
              validated && !formData.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {validated && !formData.title && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a title.
            </p>
          )}
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
            placeholder="Describe your property..."
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
              validated && !formData.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {validated && !formData.description && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a description.
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Image
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 ${
              validated && !imageFile
                ? "border border-red-500 rounded-lg"
                : ""
            }`}
          />

          {validated && !imageFile && (
            <p className="mt-1 text-sm text-red-600">
              Please select an image.
            </p>
          )}

          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          )}
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
            placeholder="1500"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
              validated && !formData.price
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {validated && !formData.price && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a price.
            </p>
          )}
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
              placeholder="e.g. Malibu"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                validated && !formData.location
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {validated && !formData.location && (
              <p className="mt-1 text-sm text-red-600">
                Please enter a city.
              </p>
            )}
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
              placeholder="e.g. United States"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                validated && !formData.country
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {validated && !formData.country && (
              <p className="mt-1 text-sm text-red-600">
                Please enter a country.
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}