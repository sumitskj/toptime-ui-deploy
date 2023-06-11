import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  0: [],
  1: [],
  2: [],
};

export const professionalBookingsSlice = createSlice({
  name: 'professionalBookings',
  initialState: initialState,
  reducers: {
    setBookings: (state, action) => {
      state[action.payload.id] = action.payload.data;
    },
  },
});

export const { setBookings } = professionalBookingsSlice.actions;

export default professionalBookingsSlice.reducer;
