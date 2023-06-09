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
import MyServices from './pages/user/my-services';
import UserMyProfile from './pages/user/my-profile';
import UserBookings from './pages/user/bookings';
import UserWallet from './pages/user/wallet';
import UserFeeds from './pages/user/feeds';
import Search from './pages/search';

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
        path: 'user/my-profile',
        element: <UserMyProfile />,
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
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
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
