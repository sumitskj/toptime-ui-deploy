import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { validateEmail } from '../../utils';
import { Header } from '../../components/no-login/header';
import MuiTextbox from '../../components/Textbox/MuiTextbox';
import { getEmailOtp, verifyOtp, getProfessionalAppliedCategories } from './api/login';
import { setlogin, setAlreadyAppliedCategories } from './slice/login';
import { openNotification } from '../notifications/slice/notification';
import {
  storeLogin,
  removeLogin,
  storeAppliedProfessionalCategories,
  storeIsProfessional,
} from '../../utils/loginStore';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const _handleSendOtp = async () => {
    if (email && isValidEmail) {
      await getEmailOtp(email);
      setShowOtp(true);
    }
  };

  const _handleBlur = () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);
  };

  const _handleReset = () => {
    setShowOtp(false);
  };

  const _verifyOtp = async () => {
    const payload = {
      email,
      otp,
    };

    try {
      const resp = await verifyOtp(payload);
      if (resp.ok) {
        const respJson = await resp.json();
        console.log('Auth Token Response:: ', respJson);
        storeLogin(respJson);
        dispatch(setlogin(respJson));
        dispatch(openNotification({ severity: 'success', message: 'Login successful!' }));
        try {
          const alreadyAppliedCategoriesResp = await getProfessionalAppliedCategories(
            respJson['accessToken'],
          );
          if (alreadyAppliedCategoriesResp.ok) {
            const alreadyAppliedCategoriesRespJson = await alreadyAppliedCategoriesResp.json();
            console.log('Already applied categoires:: ', alreadyAppliedCategoriesRespJson);
            storeAppliedProfessionalCategories(alreadyAppliedCategoriesRespJson);
            storeIsProfessional(
              alreadyAppliedCategoriesRespJson['categories'].length > 0 ? true : false,
            );
            dispatch(setAlreadyAppliedCategories(alreadyAppliedCategoriesRespJson['categories']));
          }
        } catch (error) {
          console.log('Error in fetching already Applied Categories: ', error);
        }
        navigate('/');
      } else {
        removeLogin();
        if (resp.status === 401) {
          dispatch(openNotification({ severity: 'error', message: 'Invalid OTP!' }));
        } else {
          dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
        }
      }
    } catch (error) {
      dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
      removeLogin();
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, []);

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
              <MuiTextbox
                label='Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={_handleBlur}
                name='email'
                disabled={showOtp}
                error={!isValidEmail}
                helperText={!isValidEmail ? 'Please enter valid email' : ''}
              />
              {showOtp && (
                <MuiTextbox
                  label='One time password'
                  type='password'
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              )}

              <Grid
                container
                item
                xs={12}
                justifyContent='flex-end'
                sx={{ marginTop: '1rem', marginBottom: '2rem' }}>
                {!showOtp && (
                  <Button variant='contained' onClick={_handleSendOtp}>
                    Send OTP
                  </Button>
                )}
                {showOtp && (
                  <CustomisedResetButton variant='text' onClick={_handleReset}>
                    Reset
                  </CustomisedResetButton>
                )}
                {showOtp && (
                  <Button variant='contained' onClick={_verifyOtp}>
                    Verify
                  </Button>
                )}
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
