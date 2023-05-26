import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userProfileSlice = createSlice({
  name: 'userDetails',
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserDetails } = userProfileSlice.actions;

export default userProfileSlice.reducer;
