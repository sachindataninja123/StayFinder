import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  updateListing,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);
listingRouter.post("/create", createListing);
listingRouter.patch("/:id/update", updateListing);
listingRouter.delete("/:id/delete", deleteListing);

export default listingRouter;
