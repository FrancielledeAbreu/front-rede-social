import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//style
import { Main, Container } from "./timeline-style";

//locals
import Post from "../../components/post/post";

const Timeline = () => {
  const ws = useRef(null);
  const [timeline, setTimeline] = useState([]);

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

  return (
    <>
      <Container>
        Explore esse mundo!
        <Link to="/feed">my feed</Link>
      </Container>
      <Main>
        {timeline.timeline &&
          timeline.timeline
            .sort(() => 0.5 - Math.random())
            .map((item, i) => {
              return (
                <Post
                  key={i}
                  author={item.author.username}
                  title={item.title}
                  posted_on={item.posted_on}
                  image={item.image}
                  description={item.description}
                />
              );
            })}
      </Main>
    </>
  );
};

export default Timeline;
