import React, { useContext, useRef, useState } from "react";
import "./BookingPage.css";
import { Button } from "react-bootstrap";
import { TbArrowsRightLeft } from "react-icons/tb";

import { IoExitOutline, IoEnterOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import BusContext from "../context/busContext";

function BookingPage() {
  const { setJourneyDetail } = useContext(BusContext);
  let switchFromRef = useRef();
  let switchToRef = useRef();

  const [booking, setBooking] = useState({
    from: "",
    to: "",
    date: "",
  });

  const navigateItTo = useNavigate();

  const fromSelectHandler = (e) => {
    setBooking((prevState) => {
      return { ...prevState, from: e.target.value };
    });
  };

  const toSelectHandler = (e) => {
    setBooking((prevState) => {
      return { ...prevState, to: e.target.value };
    });
  };

  const dateHandler = (e) => {
    setBooking((prevState) => {
      return { ...prevState, date: e.target.value };
    });
  };
  ///////////////////from swapping source and destination inputs!
  const switchRoutesHandler = () => {
    [switchFromRef.current.value, switchToRef.current.value] = [
      switchToRef.current.value,
      switchFromRef.current.value,
    ];
  };

  const busesListHandler = (e) => {
    e.preventDefault();
    const { from, to, date } = booking;
    if (!from || !to || !date) {
      toast.error("Fill all the fields");
    } else if (from === to) {
      toast.error("From and To location can not be same ");
    } else {
      setJourneyDetail(booking);
      navigateItTo("/BusComponent");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="search-container">
          <div className="route-box">
            <IoEnterOutline className="display-icon" />

            <select
              ref={switchFromRef}
              onChange={fromSelectHandler}
              value={booking.from}
              className="input-boxes"
            >
              <option className="initial-input">From</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
              <option>Banglore</option>
            </select>
            <div className="switch-route-box" onClick={switchRoutesHandler}>
              <TbArrowsRightLeft className="switch-route-icon" />
            </div>
            <select
              ref={switchToRef}
              onChange={toSelectHandler}
              className="input-boxes"
              value={booking.to}
            >
              <option className="initial-input">To</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
              <option>Banglore</option>
            </select>
            <IoExitOutline className="display-icon" />
          </div>
          <div className="search-box">
            <input
              onChange={dateHandler}
              type="date"
              className="input-boxes date-picker"
              value={booking.date}
            />
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={busesListHandler}
            >
              Search
            </Button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default BookingPage;
