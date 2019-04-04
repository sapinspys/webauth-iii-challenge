// ACTION TYPES
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const SET_USER = 'SET_USER'
export const SET_AUTH = 'SET_AUTH'

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED'

export const REGISTRATION_REQUESTED = 'REGISTRATION_REQUESTED'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL'

// ACTION CREATORS (ADD SET TMEOUTS HERE)
const URL = 'http://localhost:5000'

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

export const setUser = user => dispatch => {
  axios.defaults.headers.common['Authorization'] = user.token
  dispatch({ type: SET_USER, payload: user })
}

export function setAuth(token) {
  return { type: SET_AUTH, payload: token }
}

export function logout() {
  localStorage.clear()
  return { type: LOGOUT_REQUESTED }
}

// REDUCERS
const initStateRegistration = {
  registering: false,
  status: '',
  error: null
}

export function registrationReducer(state = initStateRegistration, action) {
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

let initStateLogin = {
  loggingIn: false,
  currentUser: null,
  status: '',
  error: null,
  token: '',
}

export function loginReducer(state = initStateLogin, action) {
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
        token: action.payload.token
      }
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, error: action.payload }
    case LOGOUT_REQUESTED:
      return {
        loggingIn: false,
        currentUser: null,
        error: null,
        userSet: false
      }
    default:
      return state
  }
}
