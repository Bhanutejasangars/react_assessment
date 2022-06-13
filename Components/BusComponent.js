import React, { useContext, useRef } from "react";
import "./BusComponent.css";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalWindow from "./ModalWindow";
import BusContext from "../context/busContext";
import {
  availableBuses,
  busDetails,
  getBusData,
} from "../BusesData/BusesRouteData";

function BusComponent() {
  const { journeyDetail, loggedInUser, setBookedBusDetail } =
    useContext(BusContext);
  const [modalOpen, setModalOpen] = useState(false);
  const busCompanyName = useRef();
  const navigate = useNavigate();

  const BookHandler = (id) => {
    if (loggedInUser === undefined) {
      toast.error("Please Login to Book bus");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      setModalOpen(true);
      const result = busData.find((bus) => {
        return bus?.id === id;
      });
      setBookedBusDetail(result);
    }
  };
  const close = () => {
    setModalOpen(false);
  };

  const busData = getBusData(journeyDetail, availableBuses);

  return (
    <>
      {busData[0]?.from !== undefined &&
        busData?.map((data) => (
          <div key={data?.id} className="main-container2">
            <div className="bus-details-box">
              <div className="travel-details-box">
                <div className="travel-logo-box">
                  <GoPrimitiveDot className="travel-logo" />
                  <HiOutlineDotsVertical className="travel-logo" />
                  <GoPrimitiveDot className="travel-logo" />
                </div>
                <div className="from-to-details-box timings">
                  <h6>{data?.from}</h6>
                  <h6>{data?.time + "  "} Hrs</h6>
                  <h6>{data?.to}</h6>
                </div>
              </div>
              <div className="travel-logo-box ">
                <h5>{data?.startingTime + ""}:00</h5>
                <HiOutlineDotsVertical className="travel-logo" />
                <h5>{data?.reachingTime + ""}:00</h5>
              </div>
              <div className="bus-company-details ">
                <h4 className="bus-company-name" ref={busCompanyName}>
                  {data?.name}
                </h4>
                <h6>{data?.type}</h6>
              </div>
              <div className="bus-pricing-box">
                <h3>&#8377;{data?.price}</h3>
              </div>
              <div className="bus-seats-availability-box">
                <h5>{data?.seats} Seats Left</h5>
              </div>
              <div className="bus-booking-box">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => BookHandler(data?.id)}
                >
                  Book Now
                </Button>
              </div>
            </div>
            {modalOpen && <ModalWindow closeModal={close} />}
          </div>
        ))}
      {busData[0]?.price === NaN && navigate("/BookingPage")}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default BusComponent;
