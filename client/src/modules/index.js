import { combineReducers } from 'redux'
import counter from './counter'
import login from './login'
import register from './register'

export default combineReducers({
  counter,
  login,
  register
})
