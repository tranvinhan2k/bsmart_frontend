import { UserStateType } from './slice';

export const selectUserStatus = (state: { user: UserStateType }) => state.user.isUser;

export default {
  selectUserStatus,
};
