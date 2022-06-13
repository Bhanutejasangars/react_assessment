import React, { useContext } from "react";
import "./TripsPage.css";
import BusContext from "../context/busContext";

import { BsArrowRight } from "react-icons/bs";
function TripsPage() {
  const { loggedInUser, ticket, bookedBusDetail } = useContext(BusContext);

  let myTickets = [];

  if (ticket.length !== 0) {
    ticket.forEach((element) => {
      if (element.loggedInUser === loggedInUser) {
        myTickets.push(element);
      }
    });
  }
  return (
    <div className="trips-page">
      {myTickets?.map((data) => (
        <div key={data?.id} className="ticket-component">
          <div className="source-destination-details-box">
            <h5>{data?.journeyDetail.from}</h5>
            <div>
              <BsArrowRight />
              <BsArrowRight />
              <BsArrowRight />
              <BsArrowRight />
            </div>
            <h5>{data?.journeyDetail.to}</h5>
          </div>
          <hr className="separator"></hr>
          <div className="passenger-details">
            <h6>Name:{data?.names}</h6>
            <h6>Gender:{data?.gender}</h6>
            <h6>Age:{data?.age}</h6>
            <h6>Phone:{data?.number}</h6>
            <h6>Email:{data?.email}</h6>
            <h6>{data?.journeyDetail.date}</h6>
            <h6>Seats:{data?.seats}</h6>
            <h6>Fare:{data?.fare}</h6>
            <h6>Company:{data?.busName}</h6>
            <h6>StartingTime:{data?.busStartingTime}:00</h6>
            <h6>ReachingTime:{data?.busReachingTime}:00</h6>
            <h6>Distance:{data?.distance}</h6>
            <h6>Type:({data?.busType})</h6>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TripsPage;
