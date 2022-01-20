import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './redux/features/user/User'

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
})
