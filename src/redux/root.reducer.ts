import { combineReducers } from 'redux';
import userReducer from './user/slice';
import coursesReducer from './courses/slice';
import mentorsReducer from './mentors/slice';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  mentors: mentorsReducer,
});

export default rootReducer;
