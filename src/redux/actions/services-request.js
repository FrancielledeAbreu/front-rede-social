import api from "../../services";
import { LOGIN, SIGNUP } from "./type";
import { notification } from "antd";

const login = (data) => {
  return { type: LOGIN, data };
};

const signup = (data) => {
  return { type: SIGNUP, data };
};

export const isValidUser = (values) => (dispatch) => {
  api
    .post("login/", {
      ...values,
    })
    .then(({ data }) => {
      dispatch(login(data));
      console.log(data);
      // localStorage.setItem("user", JSON.stringify(data));
      notification.success({
        message: "Olá, bem vindo(a)",
      });
    })
    .catch(({ response }) => {
      console.log(response);
      notification.error({
        message: response.statusText,
      });
    });
};

export const signupRequest = (values) => (dispatch) => {
  api
    .post("accounts/", {
      ...values,
    })
    .then(({ data }) => {
      dispatch(signup(data));
      console.log(data);
      notification.success({
        message: "Cadastro Realizado com sucesso!",
      });
    })
    .catch(({ response }) => {
      console.log(response);
      notification.error({
        message: response.statusText,
      });
    });
};
