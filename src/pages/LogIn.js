import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import classes from "./Main.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LogIn = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function moveToManagement() {
    navigate("/management", { replace: true });
  }
  function moveToHomePage() {
    navigate("/", { replace: true });
  }

  const checkCredentials = () => {
    Axios.post("https://mern-management-users.herokuapp.com/checkCredentials", { email }).then(
      (response) => {
        if (response.data[0].status === "blocked") {
          alert("User blocked");
          moveToHomePage();
          return;
        }
        if (password === response.data[0].password) {
          let today = new Date().toLocaleString();
          props.setUserLoggedTrueHandler(response.data[0]._id);
          sessionStorage.setItem('userLoggedIn', response.data[0]._id);
          Axios.post("https://mern-management-users.herokuapp.com/changeLoginTime", {
            email: email,
            newLogTime: today,
          }).then((response) => {
            moveToManagement();
          });
        } else {
          alert("Credentials incorrect");
        }
      }
    );
  };

  return (
    <div className={`${classes.vertical} ${classes.title}`}>
      <h2>Please log in below</h2>
      <div className={classes.vertical}>
        <Form.Control
          className={classes.input}
          type="text"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Form.Control
          className={classes.input}
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          variant="info"
          size="lg"
          className={classes.button}
          onClick={checkCredentials}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default LogIn;
