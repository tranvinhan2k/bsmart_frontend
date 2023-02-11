/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type UserStateType = {
  isUser: boolean;
};

const initialState: UserStateType = {
  isUser: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserStatus: (state, action) => {
      state.isUser = action.payload;
    },
  },
});

const userReducer = slice.reducer;

export default userReducer;

export const { changeUserStatus } = slice.actions;
