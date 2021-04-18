import api from "../../services";
import { POSTSLIST } from "./type";

const servicesList = (data) => {
  return { type: POSTSLIST, data };
};

export const serviceRequest = () => (dispatch) => {
  api
    .get("")
    .then(({ data }) => {
      dispatch(servicesList(data));
    })
    .catch(({ response }) => {
      console.log(response);
    });
};
