import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  links: [],
};

export const socialUpdateSlice = createSlice({
  name: 'socialUpdateSlice',
  initialState: initialState,
  reducers: {
    initSocialLinks: (state) => {
      return { ...state, links: [] };
    },
    addInitSocialLink: (state) => {
      const tmp = {
        id: crypto.randomUUID(),
        value: 0,
        link: '',
      };
      return { ...state, links: [...state.links, tmp] };
    },
    addSocialLink: (state, action) => {
      return { ...state, links: [...state.links, action.payload] };
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

export const {
  addSocialLink,
  initSocialLinks,
  removeSocialLink,
  updateSocialLink,
  addInitSocialLink,
} = socialUpdateSlice.actions;

export default socialUpdateSlice.reducer;
