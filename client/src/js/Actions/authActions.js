import axios from "axios";
import {
  ERROR,
  GET_AUTH_USER,
  LOGIN,
  LOUGOUT,
  SINGUP,
} from "../ActionTypes/ActionsTypes";

//error
export const errorHandler = () => async (dispatch) => {
  dispatch({
    type: ERROR,
  });
};

//sign up
export const registerHandler = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/register",
      newUser
    );
    dispatch({
      type: SINGUP,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler());
    console.dir(error);
  }
};

//login
export const loginHandler = (authUser) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      authUser
    );
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler());
    console.dir(error);
  }
};

////LOGOUT
export const logoutHandler = () => async (dispatch) => {
  try {
    dispatch({
      type: LOUGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

////get auth user
export const getAuthUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(
      "http://localhost:5000/api/user/authUser",
      config
    );
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler());
    console.dir(error);
  }
};
