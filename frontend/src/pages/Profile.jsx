import React from "react";
import { useSelector } from "react-redux";
import { Mail, Phone, ShieldCheck, Calendar, User, Edit3 , ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-88 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-200 border-t-rose-500" />
          <p className="text-xs text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-12 max-w-md rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center shadow-xs">
        <p className="text-sm font-semibold text-rose-700">
          Couldn't load your profile
        </p>
        <p className="mt-1 text-xs text-rose-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto mt-12 max-w-md rounded-2xl border border-dashed border-gray-300 p-8 text-center bg-gray-50/50">
        <User className="mx-auto h-10 w-10 text-gray-400 mb-2" />
        <p className="text-base font-semibold text-gray-900">
          You're not signed in
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Log in to view and manage your account details.
        </p>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
         {/* Navigation Top Bar */}
      <div className="flex items-center justify-between pb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Listings</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        {/* Banner with Airbnb signature gradient */}
        <div className="h-28 bg-linear-to-r from-rose-500 via-pink-500 to-rose-600" />

        {/* Profile Details Container */}
        <div className="px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between border-b border-gray-100 pb-5">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-2xl font-bold text-white shadow-md">
                {initials}
              </div>

              {/* Name & Role */}
              <div className="pb-1">
                <h1 className="text-xl font-bold text-gray-900">
                  {user.name || "Guest"}
                </h1>
                {user.role && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-rose-600 border border-rose-100">
                    <ShieldCheck size={13} />
                    {user.role}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Account Information List */}
          <div className="mt-6 space-y-4 text-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Personal Info
            </h2>

            {user.email && (
              <div className="flex items-center gap-3.5 text-gray-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            )}

            {user.phone && (
              <div className="flex items-center gap-3.5 text-gray-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="font-medium">+91 {user.phone}</p>
                </div>
              </div>
            )}

            {formattedDate && (
              <div className="flex items-center gap-3.5 text-gray-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
