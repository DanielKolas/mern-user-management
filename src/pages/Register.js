import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Main.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function moveToHomePage() {
    navigate("/", { replace: true });
  }
  const createUser = () => {
    if (password === password2) {
      let today = new Date().toLocaleString();
      Axios.post("https://mern-management-users.herokuapp.com/createUser", {
        name: name,
        email: email,
        password: password,
        status: "active",
        logTime: today,
        regTime: today,
      }).then((response) => {
        alert("User added");
        moveToHomePage();
      });
    }
    else{
      alert("Passwords do not match")
    }
  };

  return (
    <div className={`${classes.vertical} ${classes.title}`}>
      <h2>Please fill in the data below</h2>
      <div className={classes.vertical} >
        <Form.Control
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Control className={classes.input}
          type="email"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Form.Control className={classes.input}
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Form.Control className={classes.input}
          type="password"
          placeholder="Repeat Password..."
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
        />
        <Button variant="info" size="lg" className={classes.button} onClick={createUser}>Create User</Button>
      </div>
    </div>
  );
};
