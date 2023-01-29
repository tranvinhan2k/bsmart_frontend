import { InfoPayload } from '@/models/info'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface AuthSlice {
  status: 'no loading' | 'loading' | 'loaded' | 'failed'
  user: InfoPayload | null
  role: string
}

const auth = 'auth'

const initialState: AuthSlice = {
  status: 'no loading',
  user: null,
  role: '',
}

export const authSlice = createSlice({
  name: auth,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getUser: (state, action: PayloadAction<InfoPayload | null>) => {
      state.user = action.payload
      state.role = (action.payload?.role.code as string) || ''
    },
  },
})

export const authAction = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.auth.user
export const selectRole = (state: RootState) => state.auth.role

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

const authReducer = authSlice.reducer
export default authReducer
