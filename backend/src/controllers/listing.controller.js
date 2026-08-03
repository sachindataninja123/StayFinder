import mongoose from "mongoose";
import Listing from "../models/listing.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
  return res
    .status(200)
    .json(new ApiResponse(200, listings, "Listings fetched successfully!"));
});

export const getListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid listing ID!");
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ApiError("Listing not found!");
  }

  return res.status(200).json(new ApiResponse(200, listing, "Lising fetched!"));
});

export const createListing = asyncHandler(async (req, res) => {
  const { title, description, price, location, country } = req.body;

  if (
    !title?.trim() ||
    !description?.trim() ||
    price === undefined ||
    !location?.trim() ||
    !country?.trim()
  ) {
    throw new ApiError(
      400,
      "title, description, price, location, country all are required!",
    );
  }

  const listing = await Listing.create({
    title,
    description,
    price,
    location,
    country,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, listing, "Listing created successfully!"));
});

export const updateListingImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  if (!req.file?.path) {
    throw new ApiError(400, "Please upload an image");
  }

  // Delete previous Cloudinary image (if one exists)
  if (listing.image?.publicId) {
    await deleteFromCloudinary(listing.image.publicId);
  }

  // Upload new image
  const uploadedImage = await uploadOnCloudinary(req.file.path);

  if (!uploadedImage) {
    throw new ApiError(500, "Image upload failed");
  }

  listing.image = {
    url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
  };

  await listing.save();

  return res.status(200).json(
    new ApiResponse(200, listing, "Listing image updated successfully")

  );

});

export const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw new ApiError(400, "Please provide at least one field to update.");
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedListing, "Listing updated successfully!"),
    );
});

export const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid listing id!");
  }

  await Listing.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Listing delete successfully!"));
});

