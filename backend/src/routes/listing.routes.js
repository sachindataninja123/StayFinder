import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);
listingRouter.post("/create", createListing);

export default listingRouter;
