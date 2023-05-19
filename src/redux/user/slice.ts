/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ResponseProfilePayload } from '~/api/users';
import { CartDataPayload } from '~/models/api/cart';
import { Role } from '~/models/role';

export type UserStateType = {
  roles: Role | null;
  isUser: boolean;
  token: string | null;
  isAddToCart: boolean;
  profile: ResponseProfilePayload;
  cart: CartDataPayload | null;
  introduceCode: string;
};

const initialState: UserStateType = {
  roles: (localStorage.getItem('roles') as Role) || null,
  isUser: false,
  token: localStorage.getItem('token'),
  isAddToCart: false,
  profile: {
    isVerified: false,
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
        type: 'AVATAR',
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
  cart: null,
  introduceCode: '',
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
    updateUserCart: (state, action) => {
      state.cart = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.roles = null;
      state.profile = initialState.profile;
    },
    addIntroduceCode: (state, action) => {
      state.introduceCode = action.payload;
    },
  },
});

const userReducer = slice.reducer;

export default userReducer;

export const {
  changeUserStatus,
  toggleAddToCart,
  addProfile,
  signIn,
  logOut,
  updateUserCart,
  addIntroduceCode,
} = slice.actions;
