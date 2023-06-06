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
import MyServices from './pages/my-services';
import MyProfile from './pages/my-profile';
import Bookings from './pages/bookings';
import Wallet from './pages/wallet';
import Feeds from './pages/feeds';
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
        path: 'feeds',
        element: <Feeds />,
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
        path: 'my-services',
        element: <MyServices />,
      },
      {
        path: 'wallet',
        element: <Wallet />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
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
