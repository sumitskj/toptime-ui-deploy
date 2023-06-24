import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const HowItWorks = () => {
  return (
    <Box
      sx={{
        pl: { xs: '2rem', md: '4rem' },
        pr: { xs: '2rem', md: '4rem' },
        pt: '2rem',
        backgroundColor: '#F7CECA',
      }}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
            m: { xs: '12px', md: '16px' },
            fontWeight: '600',
          }}>
          How it works
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Box
              sx={{
                backgroundColor: 'white',
                p: '12px',
                m: { xs: '12px', md: '16px' },
                borderRadius: '0.5rem',
              }}>
              <Typography variant='h6' sx={{ fontWeight: 500 }}>
                1. Register as an expert with some skill
              </Typography>
              <Typography variant='body1' component='div'>
                Share your profile link over your social media accounts to increase earnings.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Box
              sx={{
                backgroundColor: 'white',
                p: '12px',
                m: { xs: '12px', md: '16px' },
                borderRadius: '0.5rem',
              }}>
              <Typography variant='h6' sx={{ fontWeight: 500 }} gutterBottom>
                2. Customers will book call with you
              </Typography>
              <Typography variant='body1' component='div'>
                We hold your money till your call is confirmed and completed. If call is cancelled
                money will be refunded
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Box
              sx={{
                backgroundColor: 'white',
                p: '12px',
                m: { xs: '12px', md: '16px' },
                borderRadius: '0.5rem',
              }}>
              <Typography variant='h6' sx={{ fontWeight: 500 }} gutterBottom>
                3. Connect with experts over call
              </Typography>
              <Typography variant='body1' component='div'>
                Customers fill the feedback form after the call and if there are no issues money
                will be credited to your wallet
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;
