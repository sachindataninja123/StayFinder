import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home"
import Listing from "./pages/Listing";
// import {PropertyDetailsPage} from "./pages/property/PropertyDetailsPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        {/* <Route path="/details" element={<PropertyDetailsPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
