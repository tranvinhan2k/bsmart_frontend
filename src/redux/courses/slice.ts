/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '~/api/cart';
import { PagingRequestPayload } from '~/models';
import { SubCoursePayload } from '~/models/subCourse';

export type CourseStateType = {
  filterParams: PagingRequestPayload;
  checkOutCourses: CartItem[] | SubCoursePayload | null;
  totalAmount: number;
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
