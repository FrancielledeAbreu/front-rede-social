import { signupRequest } from "../../redux/actions/services-request";
import { useDispatch, useSelector } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import React, { useState } from "react";
import { Form, Button, Input, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//style
import { Main, Container, Welcome } from "./signup-style";

//locals
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Signup = () => {
  const [valueRadio, setValue] = useState(1);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.serviceReducer);
  const history = useHistory();

  const onFinish = (values) => {
    let data = values;
    if (valueRadio === 1) {
      data.type = "User";
    } else {
      data.type = "Company";
    }

    dispatch(signupRequest(data));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 32 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  if (userData && userData.userData) {
    history.push("/");
  }

  const useStyles = makeStyles((theme) => ({
    icon: {
      color: "#ff4d4f",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Header />
      <Main>
        <Welcome>Explore conosco</Welcome>
        <Container>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ padding: "13.55%" }}
          >
            <FaceIcon fontSize="large" className={classes.icon} />
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
              rules={[
                { required: true, message: "Por favor insira sua senha!" },
              ]}
            >
              <Input.Password placeholder="senha" />
            </Form.Item>
            <Radio.Group
              onChange={onChange}
              value={valueRadio}
              style={{ marginBottom: "10%" }}
            >
              <Radio value={1}>User</Radio>
              <Radio value={2}>Company</Radio>
            </Radio.Group>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                danger
                block
              >
                Cadastrar
              </Button>
            </Form.Item>
            <Link to="/">Já tem Cadastro? Faça o login</Link>
          </Form>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Signup;
