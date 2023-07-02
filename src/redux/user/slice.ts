/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CartDataPayload } from '~/models/api/cart';
import { Role } from '~/models/role';
import { ProfilePayload } from '~/models/type';

export type UserStateType = {
  roles: Role | null;
  isUser: boolean;
  token: string | null;
  isAddToCart: boolean;
  profile: ProfilePayload;
  cart: CartDataPayload | null;
  introduceCode: string | undefined;
};

const initialState: UserStateType = {
  roles: (localStorage.getItem('roles') as Role) || null,
  isUser: false,
  token: localStorage.getItem('token'),
  isAddToCart: false,
  cart: null,
  introduceCode: '',
  profile: {
    address: '',
    birthday: '',
    email: '',
    facebookLink: '',
    fullName: '',
    gender: 'MALE',
    id: 0,
    isVerified: false,
    linkedinLink: '',
    mentorProfile: {
      id: 0,
      introduce: '',
      mentorSkills: [],
      status: 'REQUESTING',
      workingExperience: '',
    },
    phone: '',
    roles: [],
    status: false,
    userImages: [],
    wallet: {
      balance: 0,
      id: 0,
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
