// ACTION TYPES
export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const SET_USER = "SET_USER";
export const SET_AUTH = "SET_AUTH";

export const LOGOUT_REQUESTED = "LOGOUT_REQUESTED";

export const REGISTRATION_REQUESTED = "REGISTRATION_REQUESTED";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAIL = "REGISTRATION_FAIL";

// ACTION CREATORS
const URL = 'http://localhost:5000';

export const login = (username, password, callback) => dispatch => {
  dispatch({ type: LOGIN_REQUESTED });
  axios
    .post(`${URL}/api/auth/login`, { username, password })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      });
      if (callback && typeof callback === "function") {
        callback(res.token);
      }
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err
      })
    );
};

export const setUser = user => dispatch => {
  axios.defaults.headers.common["Authorization"] = user.token;
  dispatch({ type: SET_USER, payload: user });
};
export function setAuth(token) {
  return { type: SET_AUTH, payload: token };
}
export function logout() {
  localStorage.clear();
  return { type: LOG_OUT };
}

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}
