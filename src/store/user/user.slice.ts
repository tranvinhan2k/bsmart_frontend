import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload
    },
  },
})

const userReducer = slice.reducer

export default userReducer

// Actions
export const { changeUser } = slice.actions
