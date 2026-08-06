import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Listing from "./pages/Listing";
import { PropertyDetailsPage } from "./pages/property/PropertyDetailsPage";
import CreateListing from "./pages/CreateListing";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listings/:id" element={<PropertyDetailsPage />} />
        <Route path="/listings/new" element={<CreateListing />} />
      </Routes>
    </>
  );
};

export default App;
