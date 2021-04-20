import api from "../../services";
import React, { useEffect, useState } from "react";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// //style
// import { Main, Card } from "./feed-style";

//locals
import Post from "../../components/post/post";
// posts publicos de all users mais privados dos user que o current user segue
const TimelinePrivate = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [feed, setFeed] = useState([]);

  const axiosConfig = (token) => ({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  console.log(user.user, "gdgdzf");

  const handleFeed = () => {
    if (user.user == null) {
      return api
        .get(
          "/api/timeline/private",
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
          console.log(data);
          setFeed(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      return api
        .get("/api/timeline/private", axiosConfig(user.user.token))
        .then(({ data }) => {
          console.log(data);
          setFeed(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  };

  useEffect(() => {
    handleFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Link to="/feed">my feed</Link>
      {feed.length > 0 &&
        feed
          .filter((isPrivate) => isPrivate.private === true)
          .map((item, i) => {
            return (
              <div>
                {item.private && <VpnLockIcon />}
                <Post
                  kei={i}
                  author={item.author.username}
                  title={item.title}
                  posted_on={item.posted_on}
                  image={item.image}
                  description={item.description}
                  comment={item.comment}
                  like={item.like}
                />
              </div>
            );
          })}
    </div>
  );
};

export default TimelinePrivate;
