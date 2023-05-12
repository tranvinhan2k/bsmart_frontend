import { MentorStateType } from './slice';

export const selectFilterParams = (state: { mentors: MentorStateType }) =>
  state.mentors.filterParams;
