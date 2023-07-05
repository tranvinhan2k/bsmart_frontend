import { GlobalStateType } from './slice';

export const globalSubjects = (state: { global: GlobalStateType }) =>
  state.global.subjects;
export const globalCategories = (state: { global: GlobalStateType }) =>
  state.global.categories;
export const globalSlots = (state: { global: GlobalStateType }) =>
  state.global.slots;
export const globalDayOfWeeks = (state: { global: GlobalStateType }) =>
  state.global.dayOfWeeks;
