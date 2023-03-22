import { CourseStateType } from './slice';

export const selectFilterParams = (state: { courses: CourseStateType }) =>
  state.courses.filterParams;
