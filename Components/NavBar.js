import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Route, Routes, NavLink } from "react-router-dom";
import BusContext from "../context/busContext";
import { MdAccountCircle } from "react-icons/md";

import "./NavBar.css";
function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(BusContext);
  const [logged, setLogged] = useState([]);


  const logoutHandler = () => {
    setLoggedInUser(undefined);

    localStorage.removeItem("loggedIn");
  };

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem("loggedIn")));
  }, [loggedInUser]);

  return (
    <>
      <Navbar variant="dark" className="NavBox">
        <Container>
          <Navbar.Brand>
            <NavLink className="navigationLinks" to="/">
              SAFAR-BUS
            </NavLink>
          </Navbar.Brand>
          {logged && (
            <Navbar.Brand className="account-box">
              <MdAccountCircle />
              {loggedInUser}{" "}
            </Navbar.Brand>
          )}
          <Nav className="me-5">
            <Nav.Link>
              <NavLink className="navigationLinks" to="/BookingPage">
                BusBooking
              </NavLink>
            </Nav.Link>
            {!logged && (
              <Nav.Link>
                <NavLink className="navigationLinks" to="/login">
                  Login
                </NavLink>
              </Nav.Link>
            )}

            {logged && (
              <Nav.Link>
                <NavLink className="navigationLinks" to="/TripsPage">
                  My Trips
                </NavLink>
              </Nav.Link>
            )}
            {logged && (
              <Nav.Link onClick={logoutHandler}>
                <NavLink className="navigationLinks" to="/login">
                  Logout
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

