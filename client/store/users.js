import axios from 'axios';
import history from '../history';

//action types
const SET_USERS = 'SET_USERS';
// const SINGLE_USER = "SINGLE_USER";
// const UPDATE_SCORE = "UPDATE_SCORE"

let initialState = [];

//action creators
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

// export const singleUser = (user) => {
//   return {
//     type: SINGLE_USER,
//     user,
//   };
// };

// export const updateScore = (user) => {
//   return {
//     type: UPDATE_SCORE,
//     user
//   }
// }

// thunk creators
export const fetchUsers = (token) => {
  return async (dispatch) => {
    const response = await axios.get('/api/users', {
      headers: { authorization: token },
    });
    const users = response.data;
    const action = setUsers(users);
    dispatch(action);
  };
};

// export const fetchSingleUser = (token) => {
//   return async (dispatch) => {
//     const response = await axios.get('/api/users/user', {
//       headers: { authorization: token },
//     });
//     // history.push("/myprofile");
//     return dispatch(singleUser(response.data));
//   };
// };

// export const updateUserScore = (token) => {
//   return async (dispatch) => {
//     const response = await axios.put('/api/users/user', { headers: { authorization: token}})
//     return dispatch(updateScore(response.data))
//   }
// }

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return [...action.users];
    // case SINGLE_USER:
    //   return [action.user];
    // case UPDATE_SCORE:
    //   return [action.user];
    default:
      return state;
  }
}
