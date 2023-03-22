import { combineReducers } from 'redux';
import userReducer from './user/slice';
import coursesReducer from './courses/slice';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
});

export default rootReducer;
