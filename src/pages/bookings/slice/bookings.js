import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  0: [],
  1: [],
  2: [],
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: initialState,
  reducers: {
    setBookings: (state, action) => {
      state[action.payload.id] = action.payload.data;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;

export default bookingsSlice.reducer;
