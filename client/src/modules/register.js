import axios from 'axios';
import { URL } from '../AJAX_URL.js';

// ACTION TYPES
export const REGISTRATION_REQUESTED = 'REGISTRATION_REQUESTED'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL'

// ACTION CREATORS (ADD TMEOUTS HERE)
export const register = (username, department, password) => dispatch => {
  dispatch({ type: REGISTRATION_REQUESTED })
  axios
    .post(`${URL}/api/auth/register`, { username, department, password })
    .then(res => {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: res.message
      })
    })
    .catch(err => {
      dispatch({
        type: REGISTRATION_FAIL,
        payload: err.message
      })
    })
}

// REDUCERS
const initState = {
  registering: false,
  status: '',
  error: null
}

export function registrationReducer(state = initState, action) {
  switch (action.type) {
    case REGISTRATION_REQUESTED:
      return { ...state, registering: true, status: '' }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registering: false,
        status: action.payload
      }
    case REGISTRATION_FAIL:
      return {
        ...state,
        registering: false,
        error: action.payload
      }
    default:
      return state
  }
}