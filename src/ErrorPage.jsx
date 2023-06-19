import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
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
          Something unexpected happened! We are looking into that!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
