import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VpnLockIcon from "@material-ui/icons/VpnLock";

// //style
// import { Main, Card } from "./feed-style";

//locals
import Post from "../../components/post/post";
import NewModal from "../../components/modal/modal";
import { handleFeed, like, newComment } from "../../utils";

// posts  privados dos users que o current user segue

const TimelinePrivate = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [feed, setFeed] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentId, setId] = useState(null);

  useEffect(() => {
    handleFeed(user, setFeed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (id) => {
    setVisible(true);
    setId(id);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    newComment(user, values, currentId, setVisible);
  };

  return (
    <div>
      <Link to="/feed">my feed</Link>
      <NewModal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onFinish={onFinish}
      />

      {feed.length > 0 &&
        feed
          .filter((isPrivate) => isPrivate.private === true)
          .map((item, i) => {
            return (
              <div key={i}>
                {item.private && <VpnLockIcon />}
                <Post
                  author={item.author.username}
                  title={item.title}
                  posted_on={item.posted_on}
                  image={item.image}
                  description={item.description}
                  comment={item.comment}
                  like={item.like}
                  likeAction={() => like(item.id, user)}
                  commentAction={() => openModal(item.id)}
                />
              </div>
            );
          })}
    </div>
  );
};

export default TimelinePrivate;
