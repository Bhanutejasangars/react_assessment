import React, { useContext } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { useState } from "react";
import "./ModalWindow.css";
import { FaMale, FaFemale } from "react-icons/fa";
import BusContext from "../context/busContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ModalWindow(props) {
  const { setTicket, ticket, loggedInUser, journeyDetail, bookedBusDetail } =
    useContext(BusContext);
  const [names, setnames] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");

  const [show, setShow] = useState(false);
  const navigateItTo = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [seats, setSeats] = useState(1);

  const closehandle = () => {
    props.closeModal();
  };

  const handleDecSeats = () => {
    if (seats < 2) {
      setSeats(1);
    } else {
      setSeats(Number(seats) - 1);
    }
  };

  const handleIncSeats = () => {
    if (seats > 3) {
      setSeats(4);
    } else {
      setSeats(Number(seats) + 1);
    }
  };

  const confirmButtonHandler = (e) => {
    e.preventDefault();

    let fare = bookedBusDetail.price * seats;
    let distance = bookedBusDetail.distance;
    let busName = bookedBusDetail.name;
    let busStartingTime = bookedBusDetail.startingTime;
    let busReachingTime = bookedBusDetail.reachingTime;
    let busType = bookedBusDetail.type;
    const newTicket = {
      names,
      email,
      number,
      age,
      gender,
      loggedInUser,
      journeyDetail,
      seats,
      fare,
      busName,
      distance,
      busReachingTime,
      busStartingTime,
      busType,
    };

    if (!names || !email || !number || !age || !gender) {
      toast.error("Complete the form");
    } else if (!email.includes("@")) {
      toast.error("Invalid Email");
    } else {
      setTicket((preState) => {
        return [...preState, newTicket];
      });

      localStorage.setItem("tickets", JSON.stringify([...ticket, newTicket]));
      fare = "";
      busName = "";
      distance = "";
      busReachingTime = "";
      busStartingTime = "";
      busType = "";
      toast.success("ticket booked successfully");
      setTimeout(() => {
        navigateItTo("/BookingPage");
      }, 1100);
    }
  };

  return (
    <>
      <Modal className="modal-box" show={true} onHide={handleClose}>
        <Modal.Header className="modal-heading ">
          Passenger Details
          <FaFemale />
          <FaMale />
        </Modal.Header>
        <Container>
          <Modal.Body className="modal-body ">
            <div className="seat-bus-info">
              {bookedBusDetail?.name} Bus from {bookedBusDetail?.from} to{" "}
              {bookedBusDetail.to}
            </div>
            <div className="seats-info">
              <div className="ticket-count-section">
                <button className="counter-box" onClick={handleDecSeats}>
                  -
                </button>
                <h3>{seats}</h3>
                <button className="counter-box" onClick={handleIncSeats}>
                  +
                </button>
              </div>
              <div className="available-seats-info">
                <h2 className="seat-bus-info">
                  Available Seats ({Number(bookedBusDetail.seats) - seats})
                </h2>
                <h2 className="seat-bus-info">
                  Total Fare &#8377;{seats * bookedBusDetail.price}
                </h2>
              </div>
            </div>

            <div className="personal-details-box">
              <input
                className="modalinput name"
                type="text"
                placeholder="enter Name"
                value={names}
                onChange={(e) => setnames(e.target.value)}
                required
              ></input>

              <input
                className="modalinput age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setage(e.target.value)}
                required
              ></input>

              <select
                className="gender"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                <option className="Gender">Gender</option>
                <option className="male-gender">Male</option>
                <option className="female-gender">Female</option>
              </select>
            </div>

            <input
              className="email "
              type="email"
              placeholder="enter Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            ></input>

            <input
              className="phone-number"
              type="tel"
              placeholder="enter Phone number"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              required
            ></input>
          </Modal.Body>
        </Container>

        <Button
          className="close-button"
          variant="secondary"
          onClick={closehandle}
        >
          Close
        </Button>
        <Button
          className="save-button"
          variant="primary"
          onClick={confirmButtonHandler}
        >
          Confirm Ticket
        </Button>

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
      </Modal>
    </>
  );
}

export default ModalWindow;
