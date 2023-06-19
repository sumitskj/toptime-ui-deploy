import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  links: [
    {
      id: crypto.randomUUID(),
      value: 0,
      link: '',
    },
  ],
};

export const socialSlice = createSlice({
  name: 'socialSlice',
  initialState: initialState,
  reducers: {
    addSocialLink: (state) => {
      const tmp = {
        id: crypto.randomUUID(),
        value: 0,
        link: '',
      };
      return { ...state, links: [...state.links, tmp] };
    },
    removeSocialLink: (state, action) => {
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload.id),
      };
    },
    updateSocialLink: (state, action) => {
      console.log('updating data', action.payload, state);
      const newLinks = [...state.links];
      state.links.every((lk, index) => {
        if (lk.id === action.payload.id) {
          newLinks[index] = action.payload;
          return false;
        }
        return true;
      });
      console.log('nl', newLinks);
      return { ...state, links: newLinks };
    },
  },
});

export const { addSocialLink, removeSocialLink, updateSocialLink } = socialSlice.actions;

export default socialSlice.reducer;
