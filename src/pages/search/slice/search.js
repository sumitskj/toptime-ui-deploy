import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchResults: (state, action) => {
      if (action.payload.page === 0) {
        return action.payload.data;
      }
      return [...state, ...action.payload.data];
    },
  },
});

export const { setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
