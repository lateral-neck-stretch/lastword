import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_RESULT = 'ADD_RESULT'

/**
 * ACTION CREATORS
 */
const addResult = userResult => ({type: ADD_RESULT, userResult})

/**
 * THUNK CREATORS
 */
export const postResult = (overallScore, vocabScore, similarityScore, timerScore, id, token) => async dispatch => {
    const res = await axios.post(`/api/users/user/results`, {overallScore, vocabScore, similarityScore, timerScore, id, headers: { authorization: token }})
    return dispatch(addResult(res.data))
}

/**
 * REDUCER
 */
export default function(result = {}, action) {
  switch (action.type) {
    case ADD_RESULT:
      return action.userResult
    default:
      return result
  }
}
