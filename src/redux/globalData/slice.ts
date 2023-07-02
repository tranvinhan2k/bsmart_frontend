/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CategoriesPayload, SubjectPayload } from '~/models/type';

export type GlobalStateType = {
  subjects: SubjectPayload[];
  categories: CategoriesPayload[];
};

const initialState: GlobalStateType = {
  subjects: [],
  categories: [],
};

const slice = createSlice({
  name: 'courseFilter',
  initialState,
  reducers: {
    updateSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const globalReducer = slice.reducer;

export default globalReducer;

export const { updateSubjects, updateCategories } = slice.actions;
