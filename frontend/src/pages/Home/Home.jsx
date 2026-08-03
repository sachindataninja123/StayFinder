import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import CategoryFilter from "./components/CategoryFilter";
import PropertyCard from "./components/PropertyCard";
import HostBanner from "./components/HostBanner";
import Footer from "../../components/Footer";
import { Zap } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListings } from "../../features/listings/listingSlice";

const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Aethelgard Glass Villa",
    location: "Reykjavík, Iceland",
    rating: 4.98,
    reviewsCount: 124,
    price: 420,
    dates: "Oct 12 – 17",
    isSuperhost: true,
    category: "luxe",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "2",
    title: "Serenity Oceanfront Sanctuary",
    location: "Malibu, California",
    rating: 4.95,
    reviewsCount: 89,
    price: 850,
    dates: "Nov 2 – 8",
    isSuperhost: true,
    category: "beachfront",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.listings);

  console.log(items);

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const [selectedCategory, setSelectedCategory] = useState("trending");

  const filteredListings =
    selectedCategory === "trending"
      ? MOCK_LISTINGS
      : MOCK_LISTINGS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 antialiased">
      <Navbar />

      <section className="relative overflow-hidden bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-100">
            <Zap className="h-3.5 w-3.5" />
            Curated Luxury Escape Collection
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Find Stays Worth <span className="text-rose-500">Remembering</span>
          </h1>
        </div>
      </section>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="grow mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>

      <HostBanner />
      <Footer />
    </div>
  );
}
