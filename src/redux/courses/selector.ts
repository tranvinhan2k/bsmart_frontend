import { CourseStateType } from './slice';

export const selectFilterParams = (state: { courses: CourseStateType }) =>
  state.courses.filterParams;
export const selectCheckoutItem = (state: { courses: CourseStateType }) =>
  state.courses.checkOutCourses;
export const selectTotalAmount = (state: { courses: CourseStateType }) =>
  state.courses.totalAmount;
export const selectMentorCourse = (state: { courses: CourseStateType }) =>
  state.courses.mentorCourse;
