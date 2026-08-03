import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home"
import Listing from "./pages/Listing";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
      </Routes>
    </>
  );
};

export default App;
