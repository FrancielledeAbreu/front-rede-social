import { isValidUser } from "../../redux/actions/services-request";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Form, Button, Input, Layout } from "antd";
import { Link, useHistory } from "react-router-dom";

//style
import { Container } from "./login.style";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.serviceReducer);
  const history = useHistory();
  // const { Header } = Layout;

  const onFinish = (values) => {
    dispatch(isValidUser(values));
  };

  if (user && user.user) {
    console.log("aqui");
    history.push("/timeline");
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <>
      <Layout>
        {/* <Header style={{ padding: "0" }} className="header App-header">
          <Menu
            theme="light"
            mode="horizontal"
            style={{ width: "100%", borderRight: 0 }}
          >
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Header> */}
      </Layout>
      <Container>
        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Por favor insira seu username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                { required: true, message: "Por favor insira sua senha!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              style={{ textAlign: "center" }}
              {...tailLayout}
              name="remember"
              valuePropName="checked"
            >
              <Link>Esqueci a senha</Link>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
