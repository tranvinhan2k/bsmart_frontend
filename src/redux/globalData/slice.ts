/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { NotificationItemPayload } from '~/HOCs/context/NotificationItem';
import { DayOfWeekPayload } from '~/models/dayOfWeek';
import { SlotPayload } from '~/models/slot';
import { CategoriesPayload, SubjectPayload } from '~/models/type';

export type GlobalStateType = {
  subjects: SubjectPayload[];
  categories: CategoriesPayload[];
  dayOfWeeks: DayOfWeekPayload[];
  slots: SlotPayload[];
  notifications: NotificationItemPayload[];
  nCurrentPage: number;
  nTotalPage: number;
};

const initialState: GlobalStateType = {
  subjects: [],
  categories: [],
  dayOfWeeks: [],
  slots: [],
  notifications: [],
  nCurrentPage: 0,
  nTotalPage: 0,
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
    updateNotification: (state, action) => {
      state.notifications = action.payload.data;
      state.nCurrentPage = action.payload.currentPage;
      state.nTotalPage = action.payload.totalPage;
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
  updateNotification,
} = slice.actions;
