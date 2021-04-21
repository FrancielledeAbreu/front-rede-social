import React from "react";
import { Modal, Button, Form, Input } from "antd";

// //style

//locals
import { layout, tailLayout } from "../../utils";

const NewModal = ({ visible, onOk, onCancel, onFinish }) => {
  return (
    <Modal
      title="Novo Comentario"
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
  );
};

export default NewModal;
