/* eslint-disable react/jsx-no-target-blank */
import api from "../../services";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, Button, Form, Input, Radio, notification } from "antd";
//style
import { Main, Card } from "./feed-style";

//locals
import Post from "../../components/post/post";

const Feed = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [feed, setFeed] = useState([]);
  const [visible, setVisible] = useState(false);
  const [valueRadio, setValue] = useState(1);
  const url = "http://localhost:8000";
  // const [key, setKey] = useState(null);

  const axiosConfig = (token) => ({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

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
    handleFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const newPost = (values) => {
    if (user.user == null) {
      return api
        .post(
          "/api/timeline/",
          {
            ...values,
          },
          axiosConfig(JSON.parse(localStorage.getItem("user")).token)
        )
        .then(({ data }) => {
          console.log(data);
          notification.success({
            message: "Novo Post criado com sucesso!",
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
          "/api/timeline/",
          {
            ...values,
          },
          axiosConfig(user.user.token)
        )
        .then(({ data }) => {
          console.log(data);
          notification.success({
            message: "Novo Post criado com sucesso!",
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

  const openModal = () => {
    setVisible(true);
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    let data = values;
    if (valueRadio === 1) {
      data.private = true;
    } else {
      data.private = false;
    }

    newPost(values);
  };

  return (
    <>
      <div>
        <a
          href={`${url}/api/reports/following/${
            feed.length > 0 && feed[0].author.id
          }/`}
          target="_blank"
        >
          -Seguindo
        </a>

        <a
          href={`${url}/api/reports/followers/${
            feed.length > 0 && feed[0].author.id
          }/`}
          target="_blank"
        >
          -Seguidores
        </a>

        <Link to="/timeline-private">-timeline-private</Link>
        <Link to="/all-users">-all-users</Link>
      </div>
      <Modal
        title="Novo Post"
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
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Titulo" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Descrição" />
          </Form.Item>
          <Form.Item name="image">
            <Input placeholder="URL imagem" />
          </Form.Item>

          <Radio.Group
            onChange={onChange}
            value={valueRadio}
            style={{ marginBottom: "10%" }}
          >
            <Radio value={1}>Privado</Radio>
            <Radio value={2}>Público</Radio>
          </Radio.Group>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" danger>
              Postar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={openModal} size="large" danger>
        Novo Post
      </Button>
      <Main>
        {feed.length > 0 &&
          feed.map((item, i) => {
            return (
              <Card key={i}>
                <Post
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
    </>
  );
};

export default Feed;
