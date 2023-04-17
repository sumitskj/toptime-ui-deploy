import React from 'react';
import { Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Container, Toolbar, Typography, Box, Grid, ButtonGroup, Button } from '@mui/material';

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

const Main = () => {
  return (
    <div className='top-time-app-bar'>
      <AppBar position='static'>
        <Container maxWidth='false'>
          <Toolbar disableGutters>
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
              }}>
              Top Time
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid container item xs={6} justifyContent='flex-end'>
                  <CustomisedBecomeExpert variant='outlined'>Become expert</CustomisedBecomeExpert>
                  <ButtonGroup variant='outlined' disableRipple>
                    <CustomizedCreateAccount>Create account</CustomizedCreateAccount>
                    <CustomizedSignIn>Sign In</CustomizedSignIn>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Box p={1}>
          <Outlet />
        </Box>
      </main>
    </div>
  );
};

export default Main;
