import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import { theme } from './theme/theme';
import store from './redux/store';

import Main from './pages/main';
import ErrorPage from './ErrorPage';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import UserProfile from './pages/user-profile';

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
        path: 'user-profile',
        element: <UserProfile />,
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
