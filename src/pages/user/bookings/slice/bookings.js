import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  0: [],
  1: [],
  2: [],
};

export const userBookingsSlice = createSlice({
  name: 'userBookings',
  initialState: initialState,
  reducers: {
    setBookings: (state, action) => {
      state[action.payload.id] = action.payload.data;
    },
  },
});

export const { setBookings } = userBookingsSlice.actions;

export default userBookingsSlice.reducer;
