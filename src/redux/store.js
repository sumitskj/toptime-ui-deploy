import { configureStore } from '@reduxjs/toolkit';
import { getLogin } from '../utils/loginStore';

import loginReducer from '../pages/login/slice/login';

let preloadedState = {};
const adata = getLogin();
if (adata) {
  const jsonAuthData = JSON.parse(adata);
  if (jsonAuthData && jsonAuthData.accessToken) {
    console.log('set loigin data');
    preloadedState = { ...preloadedState, auth: { isAuthenticated: true, authData: jsonAuthData } };
  }
}

export default configureStore({
  reducer: {
    auth: loginReducer,
  },
  preloadedState: preloadedState,
});
