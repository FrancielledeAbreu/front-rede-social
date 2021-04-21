import api from "../../services";
import React, { useEffect, useState } from "react";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Input, notification } from "antd";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// //style
// import { Main, Card } from "./feed-style";

//locals
import Post from "../../components/post/post";
// posts publicos de all users mais privados dos user que o current user segue
const TimelinePrivate = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [feed, setFeed] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentId, setId] = useState(null);

  const axiosConfig = (token) => ({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const handleFeed = () => {
    if (user.user == null) {
      return api
        .get(
          "/api/timeline/private",
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
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

  const like = (id) => {
    if (user.user == null) {
      return api
        .post(
          `/api/timeline/post/${id}/like/`,
          {},
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
          console.log(data);
          notification.open({
            message: "Like!",

            icon: <FavoriteBorderIcon />,
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      return api
        .post(
          `/api/timeline/post/${id}/like/`,
          {},
          axiosConfig(user.user.token)
        )
        .then(({ data }) => {
          console.log(data);
          notification.open({
            message: "Like!",

            icon: <FavoriteBorderIcon />,
          });
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

  const newComment = (values) => {
    if (user.user == null) {
      return api
        .post(
          `/api/comments/${currentId}/new/`,
          {
            ...values,
          },
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
          console.log(data);
          notification.success({
            message: `${data.author.username} Obrigado pelo comentário`,
          });
          setVisible(false);
        })
        .catch(({ response }) => {
          console.log(response);
          notification.error({
            message: "Algo deu errado, desculpe!",
          });
        });
    } else {
      return api
        .post(
          `/api/comments/${currentId}/new/`,
          {
            ...values,
          },
          axiosConfig(user.user.token)
        )
        .then(({ data }) => {
          console.log(data);
          notification.success({
            message: `${data.author.username} Obrigado pelo comentário`,
          });
          setVisible(false);
        })
        .catch(({ response }) => {
          console.log(response);
          notification.error({
            message: "Algo deu errado, desculpe!",
          });
        });
    }
  };

  const openModal = (id) => {
    setVisible(true);
    setId(id);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    newComment(values);
  };

  return (
    <div>
      <Link to="/feed">my feed</Link>
      <Modal
        title="Novo Comentario"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="comment" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Deixe o seu comentário" />
          </Form.Item>

          <Form.Item name="image">
            <Input placeholder="URL imagem" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" danger>
              Comentar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
                  likeAction={() => like(item.id)}
                  commentAction={() => openModal(item.id)}
                />
              </div>
            );
          })}
    </div>
  );
};

export default TimelinePrivate;
