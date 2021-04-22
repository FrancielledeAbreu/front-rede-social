/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form, Input, Radio } from "antd";

//style
import { Main, Card, Container } from "./feed-style";

//locals
import Post from "../../components/post/post";
import { info } from "../../components/notifications/notifications";
import MenuModel from "../../components/menu/menu";
import {
  getFeed,
  newPost,
  getNotifications,
  layout,
  tailLayout,
} from "../../utils";

const Feed = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [feed, setFeed] = useState([]);
  const [notificationsList, setNotificationsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [valueRadio, setValue] = useState(1);
  const url = "http://localhost:8000";

  useEffect(() => {
    getFeed(user, setFeed);
    getNotifications(user, setNotificationsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    newPost(values, user, setVisible);
  };

  return (
    <>
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
      <Container>
        <MenuModel
          title="Feed"
          Timeline="Explore"
          Exploradores="Exploradores"
          Seguidores={
            <a
              href={`${url}/api/reports/followers/${
                feed.length > 0 && feed[0].author.id
              }/`}
              target="_blank"
              style={{
                color: "#ffff",
              }}
            >
              Seguidores
            </a>
          }
          Seguindo={
            <a
              href={`${url}/api/reports/following/${
                feed.length > 0 && feed[0].author.id
              }/`}
              target="_blank"
              style={{
                color: "#ffff",
              }}
            >
              Seguindo
            </a>
          }
          Post={
            <Button onClick={openModal} danger>
              Novo Post +
            </Button>
          }
          Info={
            <Button onClick={() => info(notificationsList)} danger>
              Notificações
            </Button>
          }
        />
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
      </Container>
    </>
  );
};

export default Feed;
