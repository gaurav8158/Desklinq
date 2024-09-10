import { Token, User, UserData } from '@/type/UserTypes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const initialState: UserData = {
  user: {
    firstName: '',
    lastName: '',
    isEmployee: false,
    phone: '',
    email: '',
    isEnabled: false,
    isPhoneVerified: false,
    role: '',
    isEmailVerified: false,
    deleted: false,
    id: '',
    wishlist: [],
  },
  token:
    typeof window !== 'undefined' && localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token') || '')
      : {
          access: {},
          refresh: {},
        },
  redirectURL: '/',
}
const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUser: (state: UserData, action: PayloadAction<User>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    updateToken: (state: UserData, action: PayloadAction<Token>) => {
      state.token = {
        ...state.token,
        ...action.payload,
      }
    },
    updateRedirectURL: (state: UserData, action: PayloadAction<string>) => {
      state.redirectURL = action.payload
    },
  },
})

export const { updateToken, updateUser, updateRedirectURL } =
  userDataSlice.actions
export default userDataSlice.reducer
