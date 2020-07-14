import axios from "axios";
import { GET_ERRORS, USER_LOADED, USER_LOADING } from "./types";
export const getUser = (userId) => (dispatch) => {
  axios
    .post("/api/users/getUser", { user_id: userId })
    .then((res) => {
      dispatch(dispatchUser(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Dispatch user name
export const dispatchUser = (user) => {
  return {
    type: USER_LOADED,
    payload: user,
  };
};

export const userLoading = () => {
  return {
    type: USER_LOADING,
  };
};
