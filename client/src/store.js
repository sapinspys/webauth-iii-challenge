import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'

import { LOGIN_SUCCESS } from './modules/login'

export const history = createHistory()

export const addTokenToLocalStorage = store => next => action => {
  if(action.type === LOGIN_SUCCESS) {
    localStorage.setItem('userToken', action.payload.token);
  }
  next(action);
};

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history), routerMiddleware(addTokenToLocalStorage)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)
