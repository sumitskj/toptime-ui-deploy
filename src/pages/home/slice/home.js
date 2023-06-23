import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  recommended: [],
  staticData: {},
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    setTrendingFeeds: (state, action) => {
      return { ...state, trending: action.payload };
    },
    setRecommendedFeeds: (state, action) => {
      return { ...state, recommended: action.payload };
    },
    setStaticData: (state, action) => {
      return { ...state, staticData: action.payload };
    },
  },
});

export const { setTrendingFeeds, setStaticData, setRecommendedFeeds } = homeSlice.actions;

export default homeSlice.reducer;
