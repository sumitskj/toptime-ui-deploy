import { configureStore } from '@reduxjs/toolkit';
import { getLogin } from '../utils/loginStore';

import loginReducer from '../pages/login/slice/login';
import notificationReducer from '../pages/notifications/slice/notification';
import bookingsReducer from '../pages/bookings/slice/bookings';
import userDetailsReducer from '../pages/user-profile/slice/userProfile';
import feedsReducer from '../pages/feeds/slice/feeds';

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
    bookings: bookingsReducer,
    userProfile: userDetailsReducer,
    feeds: feedsReducer,
  },
  preloadedState: preloadedState,
});
