import axios from 'axios';
import { URL } from '../AJAX_URL.js';

// ACTION TYPES
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
// export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED'

// ACTION CREATORS (ADD SET TMEOUTS HERE)
export const login = (username, password, callback) => dispatch => {
  dispatch({ type: LOGIN_REQUESTED })
  axios
    .put(`${URL}/api/auth/login`, { username, password })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      })
      if (callback && typeof callback === 'function') {
        callback(res.token)
      }
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message
      })
    )
}

// export function logout() {
//   localStorage.clear()
//   return { type: LOGOUT_REQUESTED }
// }

// REDUCERS
const initState = {
  loggingIn: false,
  currentUser: null,
  status: '',
  error: null,
}

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return { ...state, loggingIn: true, status: '', token: '' }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: null,
        currentUser: action.payload.user,
        status: action.payload.message,
      }
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, error: action.payload }
    // case LOGOUT_REQUESTED:
    //   return {
    //     loggingIn: false,
    //     currentUser: null,
    //     error: null,
    //   }
    default:
      return state
  }
}
