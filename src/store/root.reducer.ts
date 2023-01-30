import userReducer from '@/store/user/user.slice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
