import axios from "axios";
import { LOGIN } from "../ActionsTypes/User_action_type";

export const Login_action = (data, Navigate) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:8000/user/login", data)
      .then((res) => dispatch({ type: LOGIN, payload: res.data }));
    Navigate("/Caisses1");
  } catch (error) {
    console.log(error);
  }
};
