import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  authData: {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setlogin: (state, action) => {
      state.isAuthenticated = true;
      state.authData = action.payload;
    },
    removeLogin: (state) => {
      state.isAuthenticated = false;
      state.authData = {};
    },
  },
});

export const { setlogin, removeLogin } = loginSlice.actions;

export default loginSlice.reducer;
