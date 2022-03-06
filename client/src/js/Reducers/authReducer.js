import {
  LOGIN,
  SINGUP,
  LOUGOUT,
  GET_AUTH_USER,
  ERROR,
} from "../ActionTypes/ActionsTypes";

const initialState = {
  user: null,
  isAuth: false,
  token: localStorage.getItem("token"),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SINGUP:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuth: true,
        ...action.payload,
      };
    case LOUGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case GET_AUTH_USER:
      return {
        ...state,
        isAuth: true,
        ...action.payload,
      };
    case ERROR:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};
