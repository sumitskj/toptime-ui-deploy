import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  staticData: {},
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    setTrendingFeeds: (state, action) => {
      return { ...state, trending: action.payload };
    },
    setStaticData: (state, action) => {
      return { ...state, staticData: action.payload };
    },
  },
});

export const { setTrendingFeeds, setStaticData } = homeSlice.actions;

export default homeSlice.reducer;
