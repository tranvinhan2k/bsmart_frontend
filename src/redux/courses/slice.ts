/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '~/api/cart';
import { PagingFilterRequest } from '~/models';
import { SubCoursePayload } from '~/models/subCourse';
import { CoursePayload } from '~/models/type';
import { MentorDetailCoursePayload } from '~/pages/MentorCourseDetailPage';

export type CourseStateType = {
  filterParams: PagingFilterRequest;
  checkOutCourses: CartItem[] | SubCoursePayload | null;
  totalAmount: number;
  mentorCourse: MentorDetailCoursePayload;
};

const initialState: CourseStateType = {
  filterParams: {
    q: '',
    categoryId: undefined,
    page: 0,
    size: 24,
    sort: undefined,
    subjectId: undefined,
  },
  checkOutCourses: null,
  totalAmount: 0,
  mentorCourse: {
    level: 'BEGINNER',
    categoryId: {
      id: 0,
      label: '',
      value: '',
    },
    name: '',
    code: '0',
    description: '',
    status: 'ALL',
    subjectId: {
      id: 0,
      label: '',
      value: '',
      categoryIds: [],
      content: '',
    },
  },
};

const slice = createSlice({
  name: 'courseFilter',
  initialState,
  reducers: {
    changeFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
    addCheckoutItem: (state, action) => {
      state.checkOutCourses = action.payload.checkOutCourses;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

const coursesReducer = slice.reducer;

export default coursesReducer;

export const { changeFilterParams, addCheckoutItem } = slice.actions;
