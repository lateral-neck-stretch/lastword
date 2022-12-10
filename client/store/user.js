import axios from 'axios';
import { getUserResults } from './userResults';
import history from '../history';

//action types
const SINGLE_USER = 'SINGLE_USER';
const UPDATE_SCORE = 'UPDATE_SCORE';

//action creators
export const singleUser = (user) => {
  return {
    type: SINGLE_USER,
    user,
  };
};

export const updateScore = (user) => {
  return {
    type: UPDATE_SCORE,
    user,
  };
};

// thunk creators
export const fetchSingleUser = (token) => {
  return async (dispatch) => {
    const response = await axios.get('/api/users/user', {
      headers: { authorization: token },
    });
    // dispatch(getUserResults(token));
    // history.push("/myprofile");
    return dispatch(singleUser(response.data));
  };
};

export const updateUserScore = (token) => {
  return async (dispatch) => {
    const response = await axios.put('/api/users/user', {
      headers: { authorization: token },
    });
    return dispatch(updateScore(response.data));
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SINGLE_USER:
      return action.user;
    case UPDATE_SCORE:
      return action.user;
    default:
      return state;
  }
}
