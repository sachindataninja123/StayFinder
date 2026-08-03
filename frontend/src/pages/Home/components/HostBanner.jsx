import React from "react";
import { Link } from "react-router-dom";

const HostBanner = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:p-16 text-white">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Earn income by hosting your unique space.
          </h2>
          <p className="mt-4 text-slate-300">
            Join thousands of hosts worldwide sharing their villas, cabins, and architectural homes on StayHaven.
          </p>
          <div className="mt-8">
            <Link
              to="/host"
              className="rounded-xl bg-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-rose-600"
            >
              Become a Host Today
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
      </div>
    </section>
  );
};

export default HostBanner;