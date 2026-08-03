// import React, { useState } from "react";
// import {
//   Star,
//   ShieldCheck,
//   MapPin,
//   Heart,
//   Share,
//   ArrowLeft,
//   Check,
//   CheckCircle2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getListingById } from "../../features/listings/listingSlice";

// export function PropertyDetailsPage() {
//   const [bookingSuccess, setBookingSuccess] = useState(false);

//   const { items, loading, error } = useSelector((state) => state.listings);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getListingById());
//   });

//   const navigate = useNavigate();

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 animate-in fade-in duration-300 font-sans text-slate-900">
//       {/* Navigation Top Bar */}
//       <div className="flex items-center justify-between pb-6">
//         <button
//           onClick={() => navigate("/")}
//           className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           <span>Back to search</span>
//         </button>

//         <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
//           <button className="flex items-center gap-1.5 hover:underline">
//             <Share className="h-4 w-4" /> Share
//           </button>
//           <button className="flex items-center gap-1.5 hover:underline">
//             <Heart className="h-4 w-4" /> Save
//           </button>
//         </div>
//       </div>

//       {/* Title & Metadata */}
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//           {property.title}
//         </h1>
//         <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
//           <div className="flex items-center gap-1 font-semibold text-slate-900">
//             <Star className="h-4 w-4 fill-slate-900 text-slate-900" />
//             <span>{property.rating}</span>
//             <span className="text-slate-400 font-normal">
//               ({property.reviewsCount} reviews)
//             </span>
//           </div>
//           <span>·</span>
//           {property.isSuperhost && (
//             <>
//               <span className="flex items-center gap-1 font-medium text-slate-900">
//                 <ShieldCheck className="h-4 w-4 text-rose-500" /> Superhost
//               </span>
//               <span>·</span>
//             </>
//           )}
//           <span className="underline font-medium">{property.location}</span>
//         </div>
//       </div>

//       {/* Photo Gallery Grid */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 overflow-hidden rounded-3xl">
//         <div className="md:col-span-2 aspect-4/3 md:aspect-auto">
//           <img
//             src={property.images[0]}
//             alt="Main"
//             className="h-full w-full object-cover"
//           />
//         </div>
//         <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3">
//           {property.images.slice(1, 5).map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               alt={`Gallery ${idx}`}
//               className="h-48 w-full object-cover"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Page Content Layout */}
//       <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Left Info Column */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Host Bar */}
//           <div className="flex items-center justify-between border-b border-slate-100 pb-6">
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">
//                 Entire villa hosted by {property.hostName}
//               </h2>
//               <p className="mt-1 text-sm text-slate-500">
//                 {property.guests} guests · {property.bedrooms} bedrooms ·{" "}
//                 {property.beds} beds · {property.baths} baths
//               </p>
//             </div>
//             <img
//               src={property.hostImage}
//               alt="Host"
//               className="h-14 w-14 rounded-full object-cover shadow-sm"
//             />
//           </div>

//           {/* Highlights */}
//           <div className="space-y-4 border-b border-slate-100 pb-6 text-sm">
//             <div className="flex items-start gap-4">
//               <ShieldCheck className="h-6 w-6 text-slate-700 mt-1" />
//               <div>
//                 <p className="font-bold text-slate-900">
//                   {property.hostName} is a Superhost
//                 </p>
//                 <p className="text-slate-500">
//                   Superhosts are experienced, highly rated hosts committed to
//                   great stays.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <MapPin className="h-6 w-6 text-slate-700 mt-1" />
//               <div>
//                 <p className="font-bold text-slate-900">Great Location</p>
//                 <p className="text-slate-500">
//                   95% of recent guests gave the location a 5-star rating.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="border-b border-slate-100 pb-6">
//             <h3 className="text-lg font-bold text-slate-900 mb-3">
//               About this space
//             </h3>
//             <p className="text-slate-600 leading-relaxed">
//               {property.description}
//             </p>
//           </div>

//           {/* Amenities */}
//           <div>
//             <h3 className="text-lg font-bold text-slate-900 mb-4">
//               What this place offers
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               {property.amenities.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-3 text-sm text-slate-700"
//                 >
//                   <CheckCircle2 className="h-4 w-4 text-emerald-600" />
//                   <span>{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Sticky Checkout Widget */}
//         <div className="relative">
//           <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-6">
//             <div className="flex items-baseline justify-between">
//               <div>
//                 <span className="text-2xl font-bold text-slate-900">
//                   ${property.price}
//                 </span>
//                 <span className="text-slate-500 text-sm"> / night</span>
//               </div>
//               <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
//                 <Star className="h-4 w-4 fill-slate-900 text-slate-900" />
//                 <span>{property.rating}</span>
//               </div>
//             </div>

//             {bookingSuccess ? (
//               <div className="rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-100">
//                 <Check className="mx-auto h-10 w-10 text-emerald-600" />
//                 <h4 className="mt-2 font-bold text-emerald-900">
//                   Reservation Confirmed!
//                 </h4>
//                 <p className="mt-1 text-xs text-emerald-700">
//                   Confirmation emailed to your account.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
//                   <div className="grid grid-cols-2 border-b border-slate-200">
//                     <div className="p-3 border-r border-slate-200">
//                       <p className="font-bold uppercase text-slate-500">
//                         Check-In
//                       </p>
//                       <p className="font-semibold text-slate-800 text-sm mt-1">
//                         Oct 12, 2026
//                       </p>
//                     </div>
//                     <div className="p-3">
//                       <p className="font-bold uppercase text-slate-500">
//                         Checkout
//                       </p>
//                       <p className="font-semibold text-slate-800 text-sm mt-1">
//                         Oct 17, 2026
//                       </p>
//                     </div>
//                   </div>
//                   <div className="p-3">
//                     <p className="font-bold uppercase text-slate-500">Guests</p>
//                     <p className="font-semibold text-slate-800 text-sm mt-1">
//                       2 guests
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setBookingSuccess(true)}
//                   className="w-full rounded-xl bg-rose-500 py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-rose-600"
//                 >
//                   Reserve
//                 </button>

//                 <div className="space-y-2 text-sm text-slate-600 pt-2">
//                   <div className="flex justify-between">
//                     <span>${property.price} x 5 nights</span>
//                     <span>${property.price * 5}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Cleaning fee</span>
//                     <span>$120</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>StayHaven service fee</span>
//                     <span>$85</span>
//                   </div>
//                   <div className="flex justify-between border-t border-slate-100 pt-3 font-bold text-slate-900 text-base">
//                     <span>Total before taxes</span>
//                     <span>${property.price * 5 + 120 + 85}</span>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetailsPage;
