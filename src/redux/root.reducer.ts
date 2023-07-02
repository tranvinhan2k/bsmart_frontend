import { combineReducers } from 'redux';
import userReducer from './user/slice';
import coursesReducer from './courses/slice';
import mentorsReducer from './mentors/slice';
import globalReducer from './globalData/slice';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  mentors: mentorsReducer,
  global: globalReducer,
});

export default rootReducer;
