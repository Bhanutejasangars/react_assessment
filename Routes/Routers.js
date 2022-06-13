import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import BusComponent from "../Components/BusComponent";
import BusContext from "../context/busContext";
import BookingPage from "../Pages/BookingPage";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPageDisplay from "../Pages/ErrorPageDisplay";
import TripsPage from "../Pages/TripsPage";
import HomePage from "../Pages/HomePage";
function Routers() {
  const { loggedInUser } = useContext(BusContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!loggedInUser && <Route path="/login" element={<Login />} />}
        {!loggedInUser && <Route path="/register" element={<Register />} />}
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/BusComponent" element={<BusComponent />} />
        {loggedInUser && <Route path="/TripsPage" element={<TripsPage />} />}
        <Route path="*" element={<ErrorPageDisplay />} />
      </Routes>
    </>
  );
}

export default Routers;
