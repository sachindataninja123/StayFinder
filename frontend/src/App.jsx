import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Listing from "./pages/Listing";
import { PropertyDetailsPage } from "./pages/property/PropertyDetailsPage";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { getMeUser } from "./features/auth/auth.slice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMeUser());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listings/:id" element={<PropertyDetailsPage />} />
        <Route path="/listings/new" element={<CreateListing />} />
        <Route path="/listings/:id/edit" element={<EditListing />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
