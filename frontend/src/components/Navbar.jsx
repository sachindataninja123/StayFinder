import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Globe,
  Menu,
  User,
  Sparkles,
  MapPin,
  Calendar,
  Heart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/auth.slice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const diapatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await diapatch(logoutUser());
    } catch (error) {
      console.log("logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Stay<span className="text-rose-500">Haven</span>
          </span>
        </Link>

        {/* Central Search Pill */}
        <div className="hidden md:flex items-center rounded-full border border-slate-200/80 bg-white py-1.5 pl-4 pr-2 shadow-sm transition hover:shadow-md">
          <button className="flex items-center gap-2 pr-3 text-sm font-semibold text-slate-800 border-r border-slate-200">
            <MapPin className="h-4 w-4 text-rose-500" />
            <span>Anywhere</span>
          </button>

          <button className="flex items-center gap-2 px-3 text-sm font-semibold text-slate-800 border-r border-slate-200">
            <Calendar className="h-4 w-4 text-rose-500" />
            <span>Any week</span>
          </button>

          <button className="px-3 text-sm font-normal text-slate-500">
            Add guests
          </button>

          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white transition hover:bg-rose-600">
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Actions & User Menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/listings/new"
            className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Become a Host
          </Link>

          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100">
            <Globe className="h-4 w-4" />
          </button>

          {/* Profile Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 rounded-full border border-slate-200 p-1 pl-3 transition hover:shadow-md"
            >
              <Menu className="h-4 w-4 text-slate-600" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <User className="h-4 w-4" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {user.name}
                      </p>
                    </div>
                    <Link
                      to="/trips"
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      My Trips
                    </Link>
                    <Link
                      to="/wishlists"
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Wishlists
                    </Link>
                    <Link
                      to="/manage-listings"
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Manage Listings
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Profile
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/signin"
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Log In
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <Link
                      to="/host"
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Host your home
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Trigger */}
      <div className="px-4 pb-3 md:hidden">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm text-sm"
        >
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-rose-500" />
            <div className="text-left">
              <p className="font-semibold text-slate-800">Where to?</p>
              <p className="text-xs text-slate-500">
                Anywhere · Any week · Guests
              </p>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
