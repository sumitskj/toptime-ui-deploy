import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Header } from '../../components/no-login/header';
import MuiTextbox from '../../components/Textbox/MuiTextbox';
import { Link } from 'react-router-dom';

const CustomizedLoginBox = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  background: #ffffff;
  position: relative;
  box-shadow: 0 0 16px 8px #ddd;
  ::after {
    position: absolute;
    content: '';
    bottom: 0px;
    left: 0;
    right: 0;
    border-bottom-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    background: #129fff;
    height: 8px;
  }
`;

const CustomisedLink = styled(Link)`
  text-decoration: none;
  color: #00adff;
`;

const CustomisedResetButton = styled(Button)`
  margin: 0 8px;
  color: #00adff;
`;

const Login = () => {
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = () => {
    setShowOtp(true);
  };

  const handleReset = () => {
    setShowOtp(false);
  };

  return (
    <Grid container className='pre-login-header'>
      <Header />
      <Grid
        item
        xs={12}
        sx={{
          height: 'calc(100vh - 4rem)',
          backgroundColor: 'rgb(238,174,202)',
          background: `radial-gradient(circle, rgba(238,174,202,0.06766456582633051) 0%, 
            rgba(148,187,233,0.3113620448179272) 100%)`,
        }}>
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Grid item xs={6} sm={6} md={5} lg={3} xl={3}>
            <CustomizedLoginBox m={2} p={4}>
              <Typography variant='h6' gutterBottom>
                Top Time
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '2rem' }}
                gutterBottom>
                Sign In
              </Typography>
              <MuiTextbox label='Email' disabled={showOtp} />
              {showOtp && <MuiTextbox label='One time password' />}

              <Grid
                container
                itex
                xs={12}
                justifyContent='flex-end'
                sx={{ marginTop: '1rem', marginBottom: '2rem' }}>
                {!showOtp && (
                  <Button variant='contained' onClick={handleSendOtp}>
                    Send OTP
                  </Button>
                )}
                {showOtp && (
                  <CustomisedResetButton variant='text' onClick={handleReset}>
                    Reset
                  </CustomisedResetButton>
                )}
                {showOtp && <Button variant='contained'>Verify</Button>}
              </Grid>
              <Divider sx={{ margin: '2rem 0' }} />
              <Typography variant='body2' gutterBottom>
                No account? <CustomisedLink to='/sign-up'>Create one!</CustomisedLink>
              </Typography>
            </CustomizedLoginBox>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
