import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';

import { theme } from './theme/theme';
import store from './redux/store';

import Notification from './pages/notifications';

import Main from './pages/main';
import ErrorPage from './ErrorPage';
import Home from './pages/home';
import Login from './pages/login';
import UserProfile from './pages/user-profile';
import MyServices from './pages/professional/my-services';
import MyProfile from './pages/my-profile';
import UserBookings from './pages/user/bookings';
import UserWallet from './pages/user/wallet';
import Search from './pages/search';
import ProfessionalBookings from './pages/professional/bookings';
import ProfessionalHome from './pages/professional/home';
import ProfessionalBookingInfo from './pages/professional/bookingInfo';
import UserBookingInfo from './pages/user/bookingInfo';
import ForbiddenPage from './pages/error/forbiddenPage';
import ProfessionalWallet from './pages/professional/wallet';
import RegisterAsProfessional from './pages/user/registerAsProfessional';
import UpdateProfessionalProfile from './pages/professional/updateProfessionalProfile';
import MyRaisedIssues from './pages/user/raisedIssues';
import FillUserDetails from './pages/login/fillUserDetails';
import UserHome from './pages/user/home';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import TermsAndConditions from './pages/policies/Terms&Conditions';
import CancellationAndRefund from './pages/policies/Cancellations&Refunds';
import AboutUs from './pages/policies/AboutUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'user/home',
        element: <UserHome />,
      },
      {
        path: 'user/explore/:category?',
        element: <Search />,
      },
      {
        path: 'my-profile',
        element: <MyProfile />,
      },
      {
        path: 'professional/my-services',
        element: <MyServices />,
      },
      {
        path: 'user/wallet',
        element: <UserWallet />,
      },
      {
        path: 'user/bookings',
        element: <UserBookings />,
      },
      {
        path: 'user/my-raised-issues',
        element: <MyRaisedIssues />,
      },
      {
        path: 'register-professional',
        element: <RegisterAsProfessional />,
      },
      {
        path: 'professional/bookings',
        element: <ProfessionalBookings />,
      },
      {
        path: 'professional/home',
        element: <ProfessionalHome />,
      },
      {
        path: 'professional/wallet',
        element: <ProfessionalWallet />,
      },
      {
        path: 'professional/update-profile',
        element: <UpdateProfessionalProfile />,
      },
    ],
  },
  {
    path: 'explore/:category?',
    element: <Search />,
  },
  {
    path: '/user-profile/:id',
    element: <UserProfile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/fill-user-details',
    element: <FillUserDetails />,
  },
  {
    path: '/professional/booking/:id',
    element: <ProfessionalBookingInfo />,
  },
  {
    path: '/user/booking/:id',
    element: <UserBookingInfo />,
  },
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '/cancellation-and-refund-policy',
    element: <CancellationAndRefund />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
]);

function App() {
  return (
    <div className='top-time-app'>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Notification />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
