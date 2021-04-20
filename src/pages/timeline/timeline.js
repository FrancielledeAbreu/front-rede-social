import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

//locals
import Post from "../../components/post/post";

const Timeline = () => {
  const ws = useRef(null);
  const [timeline, setTimeline] = useState([]);
  // const user = useSelector((state) => state.serviceReducer);
  // const dispatch = useDispatch();
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/timeline/");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTimeline(data);
    };

    return () => {
      ws.current.close();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const axiosConfig = (token) => ({
  //   headers: {
  //     Authorization: `Token ${token}`,
  //   },
  // });

  // const handleLike = (id) => {
  //   axios
  //     .post(
  //       `https://follow-kenzie.herokuapp.com/api/timeline/post/${id}/like/`,
  //       axiosConfig(user.user.token)
  //     )
  //     .then((r) => {
  //       console.log(r.data);
  //     });
  // };

  // console.log(user.user.token);

  return (
    <div>
      {timeline.timeline &&
        timeline.timeline
          .sort(() => 0.5 - Math.random())
          .map((item, i) => {
            return (
              <>
                <Post
                  kei={i}
                  author={item.author.username}
                  title={item.title}
                  posted_on={item.posted_on}
                  image={item.image}
                  description={item.description}
                  // comment={item.comment}
                  // like={item.like}
                  // likeAction={() => handleLike(item.id)}
                />
              </>
            );
          })}
    </div>
  );
};

export default Timeline;
