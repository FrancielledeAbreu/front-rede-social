import { LOGIN } from "../actions/type";

const defaultState = {
  user: null,
  // token: localStorage.getItem("user"),
};
const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};

export default serviceReducer;
