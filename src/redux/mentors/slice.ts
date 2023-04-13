/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type MentorStateType = {
  filterParams: {
    q: string | undefined;
    page: number;
    size: number;
    sort: string[] | undefined;
    skills: number[] | undefined;
  };
};

const initialState: MentorStateType = {
  filterParams: {
    q: undefined,
    page: 0,
    size: 9,
    sort: undefined,
    skills: undefined,
  },
};

const slice = createSlice({
  name: 'mentorFilter',
  initialState,
  reducers: {
    changeFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
  },
});

const mentorsReducer = slice.reducer;

export default mentorsReducer;

export const { changeFilterParams } = slice.actions;
