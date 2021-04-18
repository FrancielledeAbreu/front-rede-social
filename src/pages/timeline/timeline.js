import React, { useEffect, useState, useRef } from "react";

const Timeline = () => {
  const ws = useRef(null);
  const [timeline, setTimeline] = useState([]);

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

  return (
    <div className="App">
      <p>{JSON.stringify(timeline.timeline)}</p>
    </div>
  );
};

export default Timeline;
