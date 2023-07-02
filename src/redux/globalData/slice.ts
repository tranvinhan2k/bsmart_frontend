/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SubjectPayload } from '~/models/type';

export type GlobalStateType = {
  subjects: SubjectPayload[];
};

const initialState: GlobalStateType = {
  subjects: [],
};

const slice = createSlice({
  name: 'courseFilter',
  initialState,
  reducers: {
    updateSubjects: (state, action) => {
      state.subjects = action.payload;
    },
  },
});

const globalReducer = slice.reducer;

export default globalReducer;

export const { updateSubjects } = slice.actions;
