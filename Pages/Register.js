import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import "./Login.css";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let storageArray = [];
function Register() {
  const [userName, setUserName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [formIsNotValidated, setFormIsNotValidated] = useState(false);
  const emailRef = useRef();
  const navigateItTo = useNavigate();
  const navigationHandler = () => {
    navigateItTo("/login");
  };

  useEffect(() => {
    if (
      inputEmail.includes("@") &&
      inputPassword.trim() !== "" &&
      inputPassword.length > 5 &&
      userName.trim() !== ""
    ) {
      setFormIsNotValidated(true);
    } else {
      setFormIsNotValidated(false);
    }
  }, [inputPassword, inputEmail, userName]);

  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const inputPasswordHandler = (event) => {
    setInputPassword(event.target.value);
  };
  const inputUserNameHandler = (e) => {
    setUserName(e.target.value);
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
    } else if (inputPassword.length < 5) {
      toast.error("Password length can not be less than 5 characters");
    }
  };
  const userNameBlurHandler = () => {
    if (userName.trim() === "") {
      toast.error("User name can not be empty ");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let temporaryArray = [];
    let accountsArray = JSON.parse(localStorage.getItem("UsersData"));
    if (accountsArray === null) {
      storageArray.push({
        Name: userName,
        email: inputEmail,
        password: inputPassword,
      });
      localStorage.setItem("UsersData", JSON.stringify(storageArray));
      toast.success("Account Registered ");
      setTimeout(() => {
        navigateItTo("/login");
      }, 1500);
    } else {
      let count = 0;
      accountsArray.forEach((element) => {
        if (element.email === inputEmail.trim()) {
          count++;
        }
      });
      if (count === 0) {
        storageArray.push({
          Name: userName,
          email: inputEmail,
          password: inputPassword,
        });
        temporaryArray = [...accountsArray, ...storageArray];

        localStorage.setItem("UsersData", JSON.stringify(temporaryArray));
        toast.success("Account Registered ");
        setTimeout(() => {
          navigateItTo("/login");
        }, 1000);
      } else {
        toast.error("email already Registered");
        emailRef.current.focus();
      }
    }
    temporaryArray = [];
    storageArray = [];
  };

  return (
    <Container>
      <div className="mt-5 border rounded bhanu">
        <Form className="form " onSubmit={submitHandler}>
          <Form.Group
            className="mb-3 w-50"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>UserName</Form.Label>
            <Form.Control
              onChange={inputUserNameHandler}
              onBlur={userNameBlurHandler}
              value={userName}
              placeholder="Enter your Name"
            />
          </Form.Group>
          <Form.Group
            className="mb-3 w-50"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={inputEmailHandler}
              onBlur={emailBlurHandler}
              value={inputEmail}
              ref={emailRef}
              placeholder="For Login ID"
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
              type="password"
              placeholder="Pick a Password"
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!formIsNotValidated}
          >
            SignUp
          </Button>
          <p className="mt-3">
            Already have an account?{" "}
            <strong className="login-here" onClick={navigationHandler}>
              hereLogin&raquo;
            </strong>
          </p>
        </Form>
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
    </Container>
  );
}

export default Register;
