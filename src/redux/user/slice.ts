/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ResponseProfilePayload } from '~/api/users';
import { Role } from '~/models/role';

export type UserStateType = {
  roles: Role | null;
  isUser: boolean;
  token: string | null;
  isAddToCart: boolean;
  profile: ResponseProfilePayload;
};

const initialState: UserStateType = {
  roles: (localStorage.getItem('roles') as Role) || null,
  isUser: false,
  token: localStorage.getItem('token'),
  isAddToCart: false,
  profile: {
    id: 0,
    email: '',
    address: '',
    birthday: new Date().toISOString(),
    facebookLink: '',
    fullName: '',
    instagramLink: '',
    gender: '',
    introduce: '',
    phone: '',
    roles: [
      {
        id: 0,
        code: '',
        name: '',
      },
    ],
    status: false,
    twitterLink: '',
    userImages: [
      {
        id: 0,
        name: '',
        url: '',
      },
    ],
    username: '',
    wallet: {
      id: 0,
      balance: 0,
      owner_id: 0,
      previous_balance: 0,
    },
  },
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
      state.roles = action.payload.roles;
      state.profile = action.payload.profile;
    },
    addProfile: (state, action) => {
      state.profile = action.payload.profile;
    },
    toggleAddToCart: (state, action) => {
      state.isAddToCart = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.roles = null;
      state.profile = initialState.profile;
    },
  },
});

const userReducer = slice.reducer;

export default userReducer;

export const { changeUserStatus, toggleAddToCart, addProfile, signIn, logOut } =
  slice.actions;
