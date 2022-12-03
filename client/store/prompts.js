import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_PROMPTS = "SET_PROMPTS";

/**
 * ACTION CREATORS
 */
const setPrompts = (prompts) => ({ type: SET_PROMPTS, prompts });

/**
 * THUNK CREATORS
 */
export const getPrompts = () => async (dispatch) => {
  const res = await axios.get(`/api/prompts`);
  return dispatch(setPrompts(res.data));
};

/**
 * REDUCER
 */
export default function (prompts = [], action) {
  switch (action.type) {
    case SET_PROMPTS:
      return action.prompts;
    default:
      return prompts;
  }
}
