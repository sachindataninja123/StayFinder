import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  updateListing,
  updateListingImage,
} from "../controllers/listing.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const listingRouter = express.Router();

listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);
listingRouter.post("/create", upload.single("image"), createListing);

listingRouter.patch(
  "/:id/update-image",
  upload.single("image"),
  updateListingImage,
);

listingRouter.patch("/:id/update", updateListing);
listingRouter.delete("/:id/delete", deleteListing);

export default listingRouter;
