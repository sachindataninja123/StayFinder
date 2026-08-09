import React, { useState } from "react";
import { Star, Edit2, Trash2 } from "lucide-react";

export default function ReviewItem({
  review,
  currentUserId,
  onEdit,
  onDelete,
}) {
  const { _id, rating, comment, createdAt, author } = review;
  const isAuthor = currentUserId && author?._id === currentUserId;

  return (
    <div className="rounded-2xl  bg-white space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center text-sm">
            {author?.name ? author.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">
              {author?.name || "Guest"}
            </h4>
            <p className="text-xs text-slate-500">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </p>
          </div>
        </div>

        {/* Show Edit / Delete if the user created this review */}
        {isAuthor && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(review)}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
              title="Edit review"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              title="Delete review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-slate-900 text-slate-900"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>

      <p className="text-slate-700 mt-5 text-base leading-relaxed">{comment}</p>
    </div>
  );
}
