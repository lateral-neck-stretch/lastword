import axios from "axios";

/**
 * Action Types
 */
const SET_ANS = "SET_ANS";

/**
 * Action Creators
 */
const setAns = (ans) => ({ type: SET_ANS, ans });

/**
 * Thunk Creators
 */
export const getAns = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/watson");
      dispatch(setAns(res));
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * Reducer
 */
export default function (resp = {}, action) {
  switch (action.type) {
    case SET_ANS:
      return action.ans;
    default:
      return resp;
  }
}
