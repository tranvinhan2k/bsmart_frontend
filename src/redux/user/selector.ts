import { UserStateType } from './slice';

export const selectUserStatus = (state: { user: UserStateType }) =>
  state.user.isUser;
export const selectToken = (state: { user: UserStateType }) => state.user.token;
export const selectRole = (state: { user: UserStateType }) => state.user.roles;
export const selectProfile = (state: { user: UserStateType }) =>
  state.user.profile;

export default {
  selectUserStatus,
  selectToken,
  selectProfile,
};
