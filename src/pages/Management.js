import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import classes from "./Main.module.css";
import Button from "react-bootstrap/Button";
import { FaTrashAlt, FaUnlockAlt } from "react-icons/fa";
import Table from "react-bootstrap/Table";


export const Management = (props) => {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState(props.userLogged);
  const [checkedUsers, setCheckedUsers] = useState(
    []
  );
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    setUserLogged(props.userLogge);
    Axios.get("https://mern-management-users.herokuapp.com/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const deleteUser = () => {
    Axios.post("https://mern-management-users.herokuapp.com/deleteUser", {
      checkedUsers: checkedUsers,
    }).then((response) => {
      const loggedUserSession = sessionStorage.getItem("userLoggedIn");
      if (checkedUsers.includes(loggedUserSession)) {
        navigate("/", { replace: true });
      } else {
        window.location.reload(false);
      }
    });
  };

  const blockUser = () => {
    Axios.post("https://mern-management-users.herokuapp.com/blockUser", {
      checkedUsers: checkedUsers,
    }).then((response) => {
      const loggedUserSession = sessionStorage.getItem("userLoggedIn");
      if (checkedUsers.includes(loggedUserSession)) {
        navigate("/", { replace: true });
      } else{
        window.location.reload(false);
      }
    });

  };
  
  const unblockUser = () => {
    Axios.post("https://mern-management-users.herokuapp.com/unblockUser", {
      checkedUsers: checkedUsers,
    }).then((response) => {});
    window.location.reload(false);
  };

  return (
    <div className={`${classes.vertical} ${classes.title}`}>
      <div className={classes.horizontal}>
        <Button
          variant="danger"
          size="sm"
          className={classes.buttonManagement}
          onClick={blockUser}
        >
          Block
        </Button>
        <FaUnlockAlt className={classes.icon} onClick={unblockUser} />
        <FaTrashAlt className={classes.icon} onClick={deleteUser} />
      </div>
      <Table bordered className={classes.table}>
        <tr>
          {" "}
          <th>
            {" "}
            <input type="checkbox"></input>
          </th>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Registration Time</th>
          <th>Last Login Time</th>
        </tr>
        {listOfUsers.map((user) => {
          return (
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(event) => {
                    if (event.target.checked) {
                      setCheckedUsers((checkedUsers) => [
                        ...checkedUsers,
                        user._id,
                      ]);
                    } else {
                      setCheckedUsers((users) =>
                        users.filter((_, index) => index !== 0)
                      );
                    }
                  }}
                ></input>
              </th>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.regTime}</td>
              <td>{user.logTime}</td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
};
