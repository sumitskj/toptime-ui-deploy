import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
  trending: [],
  recommended: [],
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  reducers: {
    setFeedsAll: (state, action) => {
      return { ...state, ...action.payload };
    },
    setRecommendedFeeds: (state, action) => {
      return { ...state, recommended: action.payload };
    },
  },
});

export const { setFeedsAll, setRecommendedFeeds } = feedsSlice.actions;

export default feedsSlice.reducer;
