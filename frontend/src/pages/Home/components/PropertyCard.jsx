import React, { useState } from "react";
import {
  Heart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import {Link} from "react-router-dom";

const PropertyCard = ({ listing }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-100">
        <Link to={`/listings/${listing._id}`}>
          <img
            src={listing.image.url}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-slate-900/20 p-2 backdrop-blur-md transition hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorited ? "fill-rose-500 text-rose-500" : "text-white"}`}
          />
        </button>

        {listing.isSuperhost && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
            <span>Superhost</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Link to={`/listings/${listing._id}`}>
            <h3 className="font-semibold text-slate-900 truncate pr-2">
              {listing.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium  text-slate-900">
            <Star className="h-3.5 w-3.5 fill-slate-900 text-slate-900" />
            <span>{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-slate-500">{listing.location}</p>
        <p className="text-sm text-slate-400">{listing.dates}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-base font-bold text-slate-900">
            ₹{Number(listing.price).toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-slate-500">/ night</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
