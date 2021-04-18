import api from "../../services";
import { LOGIN } from "./type";
import { notification } from "antd";

const login = (data) => {
  return { type: LOGIN, data };
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
