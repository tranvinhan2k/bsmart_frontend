/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CartItem, ResponseCartItem } from '~/api/cart';
import { CourseDetailPayload } from '~/models/courses';
import { SubCoursePayload } from '~/models/subCourse';

export type CourseStateType = {
  filterParams: {
    q: string | undefined;
    categoryId: number[] | undefined;
    subjectId: number[] | undefined;
    page: number;
    size: number;
    sort: string[] | undefined;
    provinces: number[] | undefined;
    types: number[] | undefined;
  };
  checkOutCourses: CartItem[] | SubCoursePayload | null;
  totalAmount: number;
};

const initialState: CourseStateType = {
  filterParams: {
    q: undefined,
    categoryId: undefined,
    page: 0,
    provinces: undefined,
    size: 24,
    sort: undefined,
    subjectId: undefined,
    types: undefined,
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
