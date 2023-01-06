import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function Header() {
  const navigate = useNavigate();

  const toFormOne = () => {
    navigate("/");
  };

  const toFormTwo = () => {
    navigate("/form2");
  };

  const toFormThree = () => {
    navigate("/form3");
  };

  return (
    <div>
      <Button
        onClick={() => {
          toFormOne();
        }}
      >
        {" "}
        Form 1{" "}
      </Button>
      <Button
        onClick={() => {
          toFormTwo();
        }}
      >
        Form 2
      </Button>
      <Button
        onClick={() => {
          toFormThree();
        }}
      >
        Form 3
      </Button>
    </div>
  );
}
