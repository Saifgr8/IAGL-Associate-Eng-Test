import { FETCH_TODOS } from "../actions/types";

const initialState = {
  data: {
    todos: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}