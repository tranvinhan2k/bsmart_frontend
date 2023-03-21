/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type UserStateType = {
  isUser: boolean;
  token: string | null;
  id: number | null;
  email: string | null;
  roles: string[] | null;
};

const initialState: UserStateType = {
  isUser: false,
  token: null,
  id: null,
  email: null,
  roles: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserStatus: (state, action) => {
      state.isUser = action.payload;
    },
    signIn: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
    },
  },
});

const userReducer = slice.reducer;

export default userReducer;

export const { changeUserStatus, signIn } = slice.actions;
