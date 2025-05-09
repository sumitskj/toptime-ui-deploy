import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getLogin, getAppliedProfessionalCategories } from '../utils/loginStore';

import loginReducer from '../pages/login/slice/login';
import notificationReducer from '../pages/notifications/slice/notification';
import userBookingsReducer from '../pages/user/bookings/slice/bookings';
import professionalBookingsReducer from '../pages/professional/bookings/slice/bookings';
import myProfileReducer from '../pages/my-profile/slice/myProfile';
import feedsReducer from '../pages/user/home/slice/feeds';
import categoriesReducer from '../pages/common/slice/categories';
import searchReducer from '../pages/search/slice/search';
import homeReducer from '../pages/home/slice/home';
import socialReducer from '../pages/user/registerAsProfessional/slice/socialLinksSlice';
import socialUpdateReducer from '../pages/professional/updateProfessionalProfile/slice/socialLinksUpdateSlice';

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

const appReducers = combineReducers({
  auth: loginReducer,
  notif: notificationReducer,
  userBookings: userBookingsReducer,
  professionalBookings: professionalBookingsReducer,
  myProfile: myProfileReducer,
  feeds: feedsReducer,
  categories: categoriesReducer,
  search: searchReducer,
  home: homeReducer,
  social: socialReducer,
  socialUpdate: socialUpdateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducers(undefined, action);
  }

  return appReducers(state, action);
};

export default configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
