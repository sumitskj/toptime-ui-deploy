import { configureStore } from '@reduxjs/toolkit';
import { getLogin, getAppliedProfessionalCategories } from '../utils/loginStore';

import loginReducer from '../pages/login/slice/login';
import notificationReducer from '../pages/notifications/slice/notification';
import userBookingsReducer from '../pages/user/bookings/slice/bookings';
import professionalBookingsReducer from '../pages/professional/bookings/slice/bookings';
import myProfileReducer from '../pages/my-profile/slice/myProfile';
import feedsReducer from '../pages/user/feeds/slice/feeds';
import professionalReducer from '../pages/user-profile/slice/userProfile';
import categoriesReducer from '../pages/common/slice/categories';
import searchReducer from '../pages/search/slice/search';
import homeReducer from '../pages/home/slice/home';

let preloadedState = {};
const adata = getLogin();
if (adata) {
  const jsonAuthData = JSON.parse(adata);
  if (jsonAuthData && jsonAuthData.accessToken) {
    preloadedState = { ...preloadedState, auth: { isAuthenticated: true, authData: jsonAuthData } };
  }
}
const alreadyAppliedProfessionalCategories = getAppliedProfessionalCategories();
console.log('store:: cats :: ', alreadyAppliedProfessionalCategories);
if (
  alreadyAppliedProfessionalCategories !== null &&
  alreadyAppliedProfessionalCategories.length > 0
) {
  const appliedCategories = JSON.parse(alreadyAppliedProfessionalCategories);
  preloadedState = {
    ...preloadedState,
    auth: {
      ...preloadedState.auth,
      alreadyAppliedCategories: appliedCategories,
    },
  };
  preloadedState = {
    ...preloadedState,
    auth: {
      ...preloadedState.auth,
      currentMode: appliedCategories.categories.length > 0 ? 'professional' : 'user',
    },
  };
}

export default configureStore({
  reducer: {
    auth: loginReducer,
    notif: notificationReducer,
    userBookings: userBookingsReducer,
    professionalBookings: professionalBookingsReducer,
    myProfile: myProfileReducer,
    feeds: feedsReducer,
    professionals: professionalReducer,
    categories: categoriesReducer,
    search: searchReducer,
    home: homeReducer,
  },
  preloadedState: preloadedState,
});
