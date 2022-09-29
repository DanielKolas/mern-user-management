import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Main.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  function moveToRegister() {
    navigate("/register", { replace: true });
  }

  function moveToLogin() {
    navigate("/login", { replace: true });
  }
  return (
    <div >
      <div className={`${classes.vertical} ${classes.title}`}>
        <h3>Welcome to</h3>
        <h1>User Management System</h1>
      </div>
      <div className={classes.vertical}>
        <Button variant="info" size="lg" className={classes.button} onClick={moveToLogin}>Log In</Button>
        <Button variant="outline-info" className={classes.button} size="lg" onClick={moveToRegister}>Register</Button>
      </div>
    </div>
  );
};

export default HomePage;
