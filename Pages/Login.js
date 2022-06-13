import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import "./Login.css";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BusContext from "../context/busContext";

function Login() {
  const { setLoggedInUser } = useContext(BusContext);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [formIsNotValidated, setFormIsNotValidated] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigateItTo = useNavigate();
  const navigationHandler = () => {
    navigateItTo("/register");
  };

  useEffect(() => {
    if (inputEmail.includes("@") && inputPassword.trim() !== "") {
      setFormIsNotValidated(true);
    } else {
      setFormIsNotValidated(false);
    }
  }, [inputPassword, inputEmail]);

  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const inputPasswordHandler = (event) => {
    setInputPassword(event.target.value);
  };
  const emailBlurHandler = (event) => {
    if (inputEmail.trim() === "") {
      toast.error("Email field can not be empty");
    } else if (!inputEmail.includes("@")) {
      toast.error("Enter a valid email");
    }
  };
  const passwordBlurHandler = () => {
    if (inputPassword.trim() === "") {
      toast.error("Password can not be empty");
    }
  };
  //-------------Submit---------------//
  const submitHandler = (event) => {
    event.preventDefault();

    let dataArray = JSON.parse(localStorage.getItem("UsersData"));

    let testObjectOne = 0;
    let testObjectTwo = 0;
    if (dataArray === null) {
      toast.error("user does not exists");
    } else {
      dataArray.forEach((element) => {
        if (element.email === inputEmail) {
          testObjectOne++;
          if (element.password === inputPassword) {
            testObjectTwo++;
          }
        }
      });

      if (testObjectOne === 1 && testObjectTwo === 1) {
        toast.success("Account Logging");
        setTimeout(() => {
          setLoggedInUser(inputEmail);
          localStorage.setItem("loggedIn", JSON.stringify(inputEmail));
        }, 1100);
        setTimeout(() => {
          navigateItTo("/BookingPage");
        }, 1100);
      } else if (testObjectOne === 1 && testObjectTwo === 0) {
        toast.error("Incorrect Password");
        passwordRef.current.focus();
      } else {
        toast.error("Account Does not exists");
        emailRef.current.focus();
      }
    }
  };

  return (
    <div>
      <Container className="form-container ">
        <div className="mt-5 border rounded ">
          <Form className="form " onSubmit={submitHandler}>
            <Form.Group
              className="mb-3 w-50"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>LoginID</Form.Label>
              <Form.Control
                onChange={inputEmailHandler}
                onBlur={emailBlurHandler}
                value={inputEmail}
                ref={emailRef}
                placeholder="your Email"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 w-50"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={inputPasswordHandler}
                onBlur={passwordBlurHandler}
                value={inputPassword}
                ref={passwordRef}
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!formIsNotValidated}
            >
              Login
            </Button>
            <p className="mt-3">
              Don't have an account?{" "}
              <strong className="login-here" onClick={navigationHandler}>
                SignUp Here
              </strong>
            </p>
          </Form>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    </div>
  );
}

export default Login;
