import { createSlice } from '@reduxjs/toolkit';
import { storeCategories } from '../../../utils/loginStore';

const initialState = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      storeCategories(action.payload);
      return action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
