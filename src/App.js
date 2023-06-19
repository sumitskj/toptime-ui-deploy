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
import SignUp from './pages/signup';
import UserProfile from './pages/user-profile';
import MyServices from './pages/professional/my-services';
import MyProfile from './pages/my-profile';
import UserBookings from './pages/user/bookings';
import UserWallet from './pages/user/wallet';
import UserFeeds from './pages/user/feeds';
import Search from './pages/search';
import ProfessionalBookings from './pages/professional/bookings';
import ProfessionalHome from './pages/professional/home';
import ProfessionalBookingInfo from './pages/professional/bookingInfo';
import UserBookingInfo from './pages/user/bookingInfo';
import ForbiddenPage from './pages/error/forbiddenPage';
import ProfessionalWallet from './pages/professional/wallet';
import RegisterAsProfessional from './pages/user/registerAsProfessional';

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
        path: 'explore/:category?',
        element: <Search />,
      },
      {
        path: 'user/feeds',
        element: <UserFeeds />,
      },
      {
        path: 'user-profile/:id',
        element: <UserProfile />,
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
        path: 'register-professional',
        element: <RegisterAsProfessional />,
      },
      {
        path: '/professional/bookings',
        element: <ProfessionalBookings />,
      },
      {
        path: '/professional/home',
        element: <ProfessionalHome />,
      },
      {
        path: 'professional/wallet',
        element: <ProfessionalWallet />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
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
