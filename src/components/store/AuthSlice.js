import { createSlice } from "@reduxjs/toolkit"

const userData = JSON.parse(localStorage.getItem("user2")) || {}
console.log(userData)
const authSlice = createSlice({
  name: "authState",
  initialState: {
    isLoggedIn: userData.email ? true : false,
    email: userData.email || "",
    idToken: userData.idToken || "",
  },
  reducers: {
    setLogIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action) => {
      state.idToken = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
  },
})
export default authSlice.reducer;
export const authActions = authSlice.actions;