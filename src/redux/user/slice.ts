/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MentorProfileStatusType } from '~/constants/profile';
import { WebSocketMessagePayload } from '~/hooks/useSocket';
import { CartDataPayload } from '~/models/api/cart';
import { MentorProfile } from '~/models/form';
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
  mentorProfile: MentorProfile | null;
  quizPassword: string | undefined;
  quizId: number | undefined;
  quizName: string | undefined;
  quizTime: number | undefined;
  message: WebSocketMessagePayload;
};

const initialState: UserStateType = {
  roles: (localStorage.getItem('roles') as Role) || null,
  isUser: false,
  token: localStorage.getItem('token'),
  isAddToCart: false,
  cart: null,
  introduceCode: '',
  profile: {
    id: 0,
    fullName: '',
    email: '',
    birthday: '',
    address: '',
    phone: '',
    status: false,
    gender: 'MALE',
    roles: [],
    linkedinLink: '',
    facebookLink: '',
    website: '',
    userImages: [],
    wallet: {
      balance: 0,
      id: 0,
      owner_id: 0,
      previous_balance: 0,
    },
    mentorProfile: {
      id: 0,
      introduce: '',
      mentorSkills: [],
      status: MentorProfileStatusType.REQUESTING,
      workingExperience: '',
    },
    isVerified: false,
    verified: false,
  },
  mentorProfile: null,
  quizPassword: undefined,
  quizId: undefined,
  quizName: undefined,
  quizTime: undefined,
  message: {
    data: {
      created: '',
      createdBy: '',
      entity: 'COURSE',
      lastModified: '',
      lastModifiedBy: '',
      entityId: 0,
      id: 0,
      read: false,
      type: 'PERSONAL',
      viContent: '',
      viTitle: '',
    },
    status: '',
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
    saveDataQuiz: (state, action) => {
      state.quizId = action.payload.quizId;
      state.quizName = action.payload.quizName;
      state.quizPassword = action.payload.quizPassword;
      state.quizTime = action.payload.quizTime;
    },
    reviewQuiz: (state, action) => {
      state.quizId = action.payload.quizId;
      state.quizName = action.payload.quizName;
      state.quizTime = action.payload.quizTime;
    },
    logOut: (state) => {
      state.token = null;
      state.roles = null;
      state.profile = initialState.profile;
    },
    addIntroduceCode: (state, action) => {
      state.introduceCode = action.payload;
    },
    updateWebsocketMessage: (state, action) => {
      state.message = action.payload;
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
  saveDataQuiz,
  reviewQuiz,
  updateWebsocketMessage,
} = slice.actions;
