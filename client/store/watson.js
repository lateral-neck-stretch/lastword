/**
 * Action Types
 */
const SET_TRANSCRIPT = "SET_TRANSCRIPT";

/**
 * Action Creators
 */
export const setTranscript = (transcript) => ({
  type: SET_TRANSCRIPT,
  transcript,
});

/**
 * Thunk Creators
 */

/**
 * Reducer
 */
export default function (transcript = [], action) {
  switch (action.type) {
    case SET_TRANSCRIPT:
      return action.transcript;
    default:
      return transcript;
  }
}
