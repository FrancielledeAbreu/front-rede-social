import { isValidUser } from "../../redux/actions/services-request";
import { useDispatch, useSelector } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import React from "react";
import { Form, Button, Input } from "antd";
import { useHistory } from "react-router-dom";

//style
import { Container, Title } from "./login.style";

//locals
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.serviceReducer);
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(isValidUser(values));
  };

  if (user && user.user) {
    history.push("/timeline");
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 32 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <>
      <Header />
      <Title>
        Explore a Rede <FaceIcon fontSize="large" />
      </Title>
      <Container>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ padding: "3.85%" }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Por favor insira seu username!" },
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Por favor insira sua senha!" }]}
          >
            <Input.Password placeholder="senha" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" danger>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
