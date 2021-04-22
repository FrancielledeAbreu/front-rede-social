import React, { useEffect, useState, useRef } from "react";
import { Skeleton, Card } from "antd";

//style
import { Main, Container, Posts } from "./timeline-style";

//locals
import Post from "../../components/post/post";
import MenuModel from "../../components/menu/menu";

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
      <Container>Explore esse mundo!</Container>
      <Main>
        <MenuModel title="Timeline" Feed="Feed" Exploradores="Exploradores" />
        <Posts>
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
        </Posts>
        <div>
          {Array.from({ length: 50 }, (v, k) => k).map((key) => {
            return (
              <Card style={{ width: 250, height: 200 }}>
                <Skeleton avatar active />
              </Card>
            );
          })}
        </div>
      </Main>
    </>
  );
};

export default Timeline;
