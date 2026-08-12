import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1563748415118-f5214efd4bcf?q=80&w=1476&auto=format&fit=crop",
        set: (v) => (v?.trim() ? v : undefined),
      },
      publicId: {
        type: String,
      },
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
