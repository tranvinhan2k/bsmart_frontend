/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
};

const initialState: CourseStateType = {
  filterParams: {
    q: undefined,
    categoryId: undefined,
    page: 0,
    provinces: undefined,
    size: 9,
    sort: undefined,
    subjectId: undefined,
    types: undefined,
  },
};

const slice = createSlice({
  name: 'courseFilter',
  initialState,
  reducers: {
    changeFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
  },
});

const coursesReducer = slice.reducer;

export default coursesReducer;

export const { changeFilterParams } = slice.actions;
