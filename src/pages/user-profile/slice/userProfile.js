import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [],
  profile: {},
};

export const professionalProfileSlice = createSlice({
  name: 'professional',
  initialState: initialState,
  reducers: {
    setProfessionalProfile: (state, action) => {
      return { ...state, profile: action.payload };
    },
  },
});

export const { setProfessionalProfile } = professionalProfileSlice.actions;

export default professionalProfileSlice.reducer;
