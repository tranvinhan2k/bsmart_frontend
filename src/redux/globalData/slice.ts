/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { DayOfWeekPayload } from '~/models/dayOfWeek';
import { SlotPayload } from '~/models/slot';
import { CategoriesPayload, SubjectPayload } from '~/models/type';

export type GlobalStateType = {
  subjects: SubjectPayload[];
  categories: CategoriesPayload[];
  dayOfWeeks: DayOfWeekPayload[];
  slots: SlotPayload[];
};

const initialState: GlobalStateType = {
  subjects: [],
  categories: [],
  dayOfWeeks: [],
  slots: [],
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
    updateDayOfWeeks: (state, action) => {
      state.dayOfWeeks = action.payload;
    },
    updateSlots: (state, action) => {
      state.slots = action.payload;
    },
  },
});

const globalReducer = slice.reducer;

export default globalReducer;

export const {
  updateSubjects,
  updateCategories,
  updateDayOfWeeks,
  updateSlots,
} = slice.actions;
