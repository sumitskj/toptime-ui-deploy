import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { LogoWithName } from './components/logo/Logo';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <>
      <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
        <Toolbar disableGutters>
          <div
            style={{ marginLeft: '1rem', cursor: 'pointer' }}
            onClick={() => navigate('/', { replace: 'true' })}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        sx={{ height: '100vh' }}
        direction='row'
        justifyContent='center'
        alignItems='center'>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant='h3' gutterBottom>
            Oops!
          </Typography>
          <Typography variant='body1'>
            {error.status === 404 && '404 Page not found.'}
            {error.status !== 404 && 'Something unexpected happened! We are looking into that!'}
          </Typography>
          <Button
            sx={{
              m: '1rem',
              backgroundColor: 'black',
              padding: '10px',
              color: 'white',
              transition: 'all 0.2s ease-in-out',
              ':hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'black',
              },
            }}
            onClick={() => navigate('/', { replace: 'true' })}>
            Go Home
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ErrorPage;
