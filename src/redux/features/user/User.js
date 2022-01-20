import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, getUser } = userSlice.actions

export default userSlice.reducer