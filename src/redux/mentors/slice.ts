/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PagingRequestPayload } from '~/models';

export type MentorStateType = {
  filterParams: PagingRequestPayload;
};

const initialState: MentorStateType = {
  filterParams: {
    q: '',
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
