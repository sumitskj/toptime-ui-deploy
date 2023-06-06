import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Container, Toolbar, Box, Grid, ButtonGroup, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import SideBar from './SideBar';
import Logo from '../../components/logo/Logo';

const CustomizedSignIn = styled(Button)`
  background: #000;
  color: #ffffff;
  border: 1px solid #000;
  font-weight: 600;

  :hover {
    background: #000;
    border: 1px solid #000;
    transform: translateY(-1px);
  }
`;

const CustomizedCreateAccount = styled(Button)`
  color: #000;
  border: 1px solid #000;
  font-weight: 600;

  :hover {
    border: 1px solid #000;
    transform: translateY(-1px);
  }
`;

const CustomisedBecomeExpert = styled(Button)`
  font-weight: 600;
  border: 1px solid #000;
  color: #000;
  margin-right: 2rem;
  :hover {
    border: 1px solid #000;
    transform: translateY(-1px);
  }
`;

const drawerWidth = 240;

const Main = () => {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth);

  const handleLogIn = () => {
    navigate('/login');
  };
  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const calcDrawerWidth = authData.isAuthenticated ? drawerWidth : 0;

  return (
    <Box sx={{ display: 'flex' }} className='top-time-app-bar'>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${calcDrawerWidth}px)` },
          ml: { sm: `${calcDrawerWidth}px` },
        }}>
        <Container maxWidth='false'>
          <Toolbar disableGutters>
            {authData.isAuthenticated && (
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}>
                <MenuIcon />
              </IconButton>
            )}
            {!authData.isAuthenticated && (
              <Link to='/'>
                <Logo />
              </Link>
            )}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid container item xs={6} justifyContent='flex-end'>
                  <CustomisedBecomeExpert variant='outlined'>Become expert</CustomisedBecomeExpert>
                  {!authData.isAuthenticated && (
                    <ButtonGroup variant='outlined' disableRipple>
                      <CustomizedCreateAccount onClick={handleSignUp}>
                        Create account
                      </CustomizedCreateAccount>
                      <CustomizedSignIn onClick={handleLogIn}>Sign In</CustomizedSignIn>
                    </ButtonGroup>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {authData.isAuthenticated && (
        <Box
          component='nav'
          sx={{ width: { sm: calcDrawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'>
          <SideBar
            drawerWidth={calcDrawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
      )}
      <Box
        component='main'
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${calcDrawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
