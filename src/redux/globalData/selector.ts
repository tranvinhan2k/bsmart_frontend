import { GlobalStateType } from './slice';

export const globalSubjects = (state: { global: GlobalStateType }) =>
  state.global.subjects;
export const globalCategories = (state: { global: GlobalStateType }) =>
  state.global.categories;
export const globalSlots = (state: { global: GlobalStateType }) =>
  state.global.slots;
export const globalDayOfWeeks = (state: { global: GlobalStateType }) =>
  state.global.dayOfWeeks;
export const globalNotifications = (state: { global: GlobalStateType }) => ({
  data: state.global.notifications,
  currentPage: state.global.nCurrentPage,
  totalPage: state.global.nTotalPage,
});
export const isLoaded = (state: { global: GlobalStateType }) =>
  state.global?.categories?.length !== 0 &&
  state.global?.dayOfWeeks?.length !== 0 &&
  state.global?.slots?.length !== 0 &&
  state.global?.subjects?.length !== 0;
