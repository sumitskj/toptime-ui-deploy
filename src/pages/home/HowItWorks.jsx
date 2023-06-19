import React from 'react';
import { Grid, Typography } from '@mui/material';
import { CustomisedCardLabels, StyledBoxHIW } from './components';

const HowItWorks = () => {
  return (
    <Grid item xs={12}>
      <CustomisedCardLabels variant='h4'>How it works</CustomisedCardLabels>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <StyledBoxHIW>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
              1. Search your expert
            </Typography>
          </StyledBoxHIW>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <StyledBoxHIW>
            <Typography variant='h5' sx={{ fontWeight: 600 }} gutterBottom>
              2. Select time, duration and book the call
            </Typography>
            <Typography variant='body1' component='div'>
              We hold your money till call is confirmed and completed. If call is cancelled your
              money will be refunded.
            </Typography>
          </StyledBoxHIW>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <StyledBoxHIW>
            <Typography variant='h5' sx={{ fontWeight: 600 }} gutterBottom>
              3. Connect with experts over call
            </Typography>
            <Typography variant='body1' component='div'>
              Fill the feedback form after the call.
            </Typography>
          </StyledBoxHIW>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HowItWorks;
