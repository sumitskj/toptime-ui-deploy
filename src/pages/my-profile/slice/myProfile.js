import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState: initialState,
  reducers: {
    setMyUserDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMyUserDetails } = myProfileSlice.actions;

export default myProfileSlice.reducer;
