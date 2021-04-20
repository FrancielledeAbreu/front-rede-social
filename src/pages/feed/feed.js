import api from "../../services";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

//style
import { Main, Card } from "./feed-style";

//locals
import Post from "../../components/post/post";

const Feed = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [feed, setFeed] = useState([]);
  // const [key, setKey] = useState(null);

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
          "/api/feed/",
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
        .get("/api/feed/", axiosConfig(user.user.token))
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
    // if (user.user !== null) {
    //   setKey(user.user);
    // } else {
    //   setKey(JSON.parse(localStorage.getItem("user")));
    // }
    handleFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(key, "gdgdzf");
  return (
    <Main>
      {feed.length > 0 &&
        feed.map((item, i) => {
          return (
            <Card>
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
            </Card>
          );
        })}
    </Main>
  );
};

export default Feed;
