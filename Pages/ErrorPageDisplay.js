import React from "react";
import { TbError404 } from "react-icons/tb";
const ErrorPageDisplay = () => {
  return (
    <div>
      <h1
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "red",
          fontSize: "40px",
          textAlign: "center,",
        }}
      >
        <TbError404 style={{ fontSize: "80px", color: "black" }} />
        Page Not Found
      </h1>
    </div>
  );
};

export default ErrorPageDisplay;
