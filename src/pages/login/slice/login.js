import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  authData: {},
  alreadyAppliedCategories: [],
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
    setAlreadyAppliedCategories: (state, action) => {
      state.alreadyAppliedCategories = action.payload;
    },
  },
});

export const { setlogin, removeLogin, setAlreadyAppliedCategories } = loginSlice.actions;

export default loginSlice.reducer;
