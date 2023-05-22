import { configureStore } from '@reduxjs/toolkit';
import { getLogin } from '../utils/loginStore';

import loginReducer from '../pages/login/slice/login';
import notificationReducer from '../pages/notifications/slice/notification';

let preloadedState = {};
const adata = getLogin();
if (adata) {
  const jsonAuthData = JSON.parse(adata);
  if (jsonAuthData && jsonAuthData.accessToken) {
    preloadedState = { ...preloadedState, auth: { isAuthenticated: true, authData: jsonAuthData } };
  }
}

export default configureStore({
  reducer: {
    auth: loginReducer,
    notif: notificationReducer,
  },
  preloadedState: preloadedState,
});
