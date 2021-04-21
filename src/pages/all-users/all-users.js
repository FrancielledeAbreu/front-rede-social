/* eslint-disable react/jsx-no-target-blank */
import api from "../../services";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import BusinessIcon from "@material-ui/icons/Business";

// //style
// import { Main, Card } from "./users-style";

//locals

const Users = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [users, setusers] = useState([]);
  const useStyles = makeStyles((theme) => ({
    icon: {
      color: "#ff4d4f",
    },
  }));

  const classes = useStyles();
  const axiosConfig = (token) => ({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const handleusers = () => {
    if (user.user == null) {
      return api
        .get(
          "/api/members/",
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
          setusers(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      return api
        .get("/api/members/", axiosConfig(user.user.token))
        .then(({ data }) => {
          console.log(data);
          setusers(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  };

  const follow = (id) => {
    if (user.user == null) {
      return api
        .post(
          `/api/members/${id}/follow/`,
          {},
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
          console.log(data);
          console.log("seguiu");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      return api
        .post(`/api/members/${id}/follow/`, {}, axiosConfig(user.user.token))
        .then(({ data }) => {
          console.log(data);
          console.log("seguiu");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  };

  useEffect(() => {
    handleusers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Link to="/timeline-private">-timeline-private</Link>

      <div>
        <FaceIcon fontSize="large" className={classes.icon} />
        {users.results &&
          users.results
            .filter((item) => item.type === "client" || item.type === "User")
            .map((item, i) => {
              return (
                <div key={i}>
                  {item.username}
                  <button onClick={() => follow(item.id)}> seguir</button>
                </div>
              );
            })}
      </div>
      <div>
        <BusinessIcon fontSize="large" className={classes.icon} />
        {users.results &&
          users.results
            .filter((item) => item.type === "Company")
            .map((item, i) => {
              return (
                <div key={i}>
                  {item.username}
                  <button onClick={() => follow(item.id)}> seguir</button>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Users;
