import { LOGIN } from "../ActionsTypes/User_action_type";

const initialState = { user: {} };

export const Users_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      localStorage.setItem("Token", payload.Token);
      return { ...state, user: payload.User };

    default:
      return state;
  }
};
