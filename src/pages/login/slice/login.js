import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  authData: {},
  alreadyAppliedCategories: [],
  currentMode: 'user',
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
    setCurrentMode: (state, action) => {
      console.log('Setting current mode : ', action.payload);
      state.currentMode = action.payload;
    },
  },
});

export const { setlogin, removeLogin, setAlreadyAppliedCategories, setCurrentMode } =
  loginSlice.actions;

export default loginSlice.reducer;
