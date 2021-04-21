import React, { useState } from "react";

import { Modal, Button, Form, Input, Radio } from "antd";

// //style
// import { Main, Card } from "./feed-style";

const NewPost = ({
  visible,
  onOk,
  onCancel,
  onFinish,
  onChangeRadio,
  valueRadio,
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div>
      <Modal
        title="Novo Post"
        centered
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
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

          <Form.Item name="image">
            <Input placeholder="URL imagem" />
          </Form.Item>

          <Radio.Group
            onChange={onChangeRadio}
            value={valueRadio}
            style={{ marginBottom: "10%" }}
          >
            <Radio value={1}>Privado</Radio>
            <Radio value={2}>Publico</Radio>
          </Radio.Group>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" danger>
              Postar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewPost;
