import axios from 'axios';
// import history from '../history';

const SET_LEADERBOARD = 'SET_LEADERBOARD';

// Action Creator
const setLeaderboard = (leaderboard) => {
  return {
    type: SET_LEADERBOARD,
    leaderboard,
  };
};

/**
 *
 * Thunk creator
 */
export const fetchLeaderboard = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/prompts/leaderboard/${id}`);
    dispatch(setLeaderboard(data));
  };
};

/**
 *
 * Reducer
 */
export default function leaderboard(state = [], action) {
  switch (action.type) {
    case SET_LEADERBOARD:
      return action.leaderboard;
    default:
      return state;
  }
}
