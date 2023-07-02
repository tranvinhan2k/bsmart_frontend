import { GlobalStateType } from './slice';

export const globalSubjects = (state: { global: GlobalStateType }) =>
  state.global.subjects;
