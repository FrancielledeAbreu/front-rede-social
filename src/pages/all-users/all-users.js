/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import BusinessIcon from "@material-ui/icons/Business";

//style

//locals
import { handleUsers, follow, useStyles } from "../../utils";

const Users = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [users, setusers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    handleUsers(user, setusers);
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
                  <button onClick={() => follow(item.id, user)}> seguir</button>
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
              let id = item.id;
              return (
                <div key={i}>
                  {item.username}
                  <button onClick={() => follow(user, id)}> seguir</button>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Users;
