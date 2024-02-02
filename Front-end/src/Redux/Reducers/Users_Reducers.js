import { GETCURRENT, LOGIN, LOGOUT } from "../ActionsTypes/User_action_type";

const initialState = { user: {} };

export const Users_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      localStorage.setItem("Token", payload.Token);
      return { ...state, user: payload.User };
    case LOGOUT:
      localStorage.removeItem("Token");
      return { ...state, user: {} };
    case GETCURRENT:
      localStorage.setItem();
    default:
      return state;
  }
};
