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
import { isAuth, isRole } from "../middlewares/isAuth.middleware.js";

const listingRouter = express.Router();

listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);
listingRouter.post(
  "/create",
  isAuth,
  isRole("host"),
  upload.single("image"),
  createListing,
);

listingRouter.patch(
  "/:id/update-image",
  isAuth,
  isRole("host"),
  upload.single("image"),
  updateListingImage,
);

listingRouter.patch("/:id/update", isAuth, isRole("host"), updateListing);

listingRouter.delete("/:id/delete", isAuth, isRole("host"), deleteListing);

export default listingRouter;
