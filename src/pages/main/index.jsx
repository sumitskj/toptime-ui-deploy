import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Grid,
  ButtonGroup,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import SideBar from './SideBar';

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

  return (
    <Box sx={{ display: 'flex' }} className='top-time-app-bar'>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Container maxWidth='false'>
          <Toolbar disableGutters>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            {/* for screens other than xs */}
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                display: { sm: 'none' },
              }}>
              Top Time
            </Typography>
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
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        <SideBar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
