import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_PROMPT = "SET_PROMPT";

/**
 * ACTION CREATORS
 */
const setPrompt = (prompt) => ({ type: SET_PROMPT, prompt });

/**
 * THUNK CREATORS
 */
export const getPrompt = (id) => async (dispatch) => {
  const res = await axios.get(`/api/prompts/${id}`);
  history.push("/prompts");
  return dispatch(setPrompt(res.data));
};

/**
 * REDUCER
 */
export default function (prompt = {}, action) {
  switch (action.type) {
    case SET_PROMPT:
      return action.prompt;
    default:
      return prompt;
  }
}
