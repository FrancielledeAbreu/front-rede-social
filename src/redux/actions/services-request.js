import api from "../../services";
import { LOGIN, SIGNUP, LOGOUT } from "./type";
import { notification } from "antd";

const login = (data) => {
  return { type: LOGIN, data };
};

const signup = (data) => {
  return { type: SIGNUP, data };
};

export const setLogout = (cleanToken, cleanUser) => ({
  type: LOGOUT,
  cleanToken,
  cleanUser,
});

export const isValidUser = (values) => (dispatch) => {
  api
    .post("/api/login/", {
      ...values,
    })
    .then(({ data }) => {
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
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
    .post("/api/accounts/", {
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
