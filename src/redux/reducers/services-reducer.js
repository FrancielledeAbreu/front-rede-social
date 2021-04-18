import { POSTSLIST } from "../actions/type";

const defaultState = [];
const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case POSTSLIST:
      return action.data;

    default:
      return state;
  }
};

export default serviceReducer;
