import { UserStateType } from './slice';

export const selectUserStatus = (state: { user: UserStateType }) =>
  state.user.isUser;
export const selectToken = (state: { user: UserStateType }) => state.user.token;
export const selectIsToggleAddToCart = (state: { user: UserStateType }) =>
  state.user.isAddToCart;
export const selectRole = (state: { user: UserStateType }) => state.user.roles;
export const selectProfile = (state: { user: UserStateType }) =>
  state.user.profile;
export const selectCart = (state: { user: UserStateType }) => state.user.cart;
export const selectIntroduceCode = (state: { user: UserStateType }) =>
  state.user.introduceCode;

export default {
  selectUserStatus,
  selectToken,
  selectProfile,
  selectCart,
  selectIsToggleAddToCart,
  selectIntroduceCode,
};
