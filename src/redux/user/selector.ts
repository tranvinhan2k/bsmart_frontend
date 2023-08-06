import { Role } from '~/models/role';
import { UserStateType } from './slice';

export const selectUserStatus = (state: { user: UserStateType }) =>
  state.user.isUser;
export const selectToken = (state: { user: UserStateType }) => state.user.token;
export const selectIsToggleAddToCart = (state: { user: UserStateType }) =>
  state.user.isAddToCart;
export const selectRole = (state: { user: UserStateType }) =>
  state.user.roles as Role;
export const selectProfile = (state: { user: UserStateType }) =>
  state.user.profile;
export const selectCart = (state: { user: UserStateType }) => state.user.cart;
export const selectIntroduceCode = (state: { user: UserStateType }) =>
  state.user.introduceCode;
export const selectMessage = (state: { user: UserStateType }) =>
  state.user.message;
export const selectDataQuiz = (state: { user: UserStateType }) => ({
  id: state.user.quizId,
  name: state.user.quizName,
  password: state.user.quizPassword,
  time: state.user.quizTime,
});
export default {
  selectUserStatus,
  selectToken,
  selectProfile,
  selectCart,
  selectIsToggleAddToCart,
  selectIntroduceCode,
};
