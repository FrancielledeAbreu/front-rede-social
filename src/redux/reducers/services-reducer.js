import { LOGIN, SIGNUP } from "../actions/type";

const defaultState = {
  user: null,
  userData: null,
  // token: localStorage.getItem("user"),
};
const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.data,
      };
    case SIGNUP:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};

export default serviceReducer;
