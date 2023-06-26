import React, { useState } from 'react';
import { Typography, CircularProgress, InputBase, AppBar, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import './Login.css';
import ErrorIcon from '@mui/icons-material/Error';
import { validateEmail } from '../../utils';
import {
  getEmailOtp,
  verifyOtp,
  getProfessionalAppliedCategories,
  getUserDetails,
} from './api/login';
import { setlogin, setAlreadyAppliedCategories, setCurrentMode } from './slice/login';
import { openNotification } from '../notifications/slice/notification';
import {
  storeLogin,
  removeLogin,
  storeAppliedProfessionalCategories,
  storeIsProfessional,
  removeIsProfessional,
  removeAppliedProfessionalCategories,
  removeCategories,
  removeIsRegisteredUser,
  storeIsRegisteredUser,
} from '../../utils/loginStore';
import { useNavigate } from 'react-router-dom';
import { LogoWithName } from '../../components/logo/Logo';
import moment from 'moment';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showLoader, setShowLoader] = useState(() => false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [showResendOtp, setShowResendOtp] = useState(false);
  let timer = null;

  const emailIdInputCallback = (event) => {
    setEmail(event.target.value);
    const isValid = validateEmail(event.target.value);
    setIsValidEmail(isValid);
  };

  const otpInputCallback = (event) => {
    setOtp(event.target.value);
  };

  const calculateTimeLeft = (target) => {
    let difference = target - new Date();
    let tmp = {};
    if (difference > 0) {
      tmp = difference / 1000;
    } else {
      clearInterval(timer);
      setShowResendOtp(true);
    }
    return tmp;
  };

  const _handleSendOtp = async () => {
    if (email && isValidEmail) {
      setShowLoader(true);
      await getEmailOtp(email);
      setShowOtp(true);
      setShowLoader(false);
      setShowResendOtp(false);
      const targetTime = moment().add(10, 'seconds');
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetTime));
      }, 1000);
      return () => clearInterval(timer);
    }
  };

  const _verifyOtp = async () => {
    const payload = {
      email,
      otp,
    };

    try {
      if (!isValidEmail) {
        return;
      }
      setShowLoader(true);
      const resp = await verifyOtp(payload);
      if (resp.ok) {
        const respJson = await resp.json();
        console.log('Auth Token Response:: ', respJson);
        storeLogin(respJson);
        dispatch(setlogin(respJson));
        dispatch(openNotification({ severity: 'success', message: 'Login successful!' }));

        // set already applied categories and isProfessional
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
            dispatch(
              setCurrentMode(
                alreadyAppliedCategoriesRespJson['categories'].length > 0 ? 'professional' : 'user',
              ),
            );
          }
        } catch (error) {
          console.log('Error in fetching already Applied Categories: ', error);
        }

        // fetch user details
        try {
          const userDetailsResp = await getUserDetails(respJson['accessToken']);
          if (userDetailsResp.status === 200) {
            storeIsRegisteredUser(true);
            console.log('User is registered');
            navigate('/', { replace: 'true' });
          } else {
            console.log('User not registered');
            navigate('/fill-user-details', { replace: 'true' });
          }
        } catch (error) {
          console.log('Error in fetching user details: ', error);
          navigate('/fill-user-details', { replace: 'true' });
        }
      } else {
        removeLogin();
        removeIsProfessional();
        removeAppliedProfessionalCategories();
        removeCategories();
        removeIsRegisteredUser();
        dispatch({ type: 'USER_LOGOUT' });
        if (resp.status === 401) {
          dispatch(openNotification({ severity: 'error', message: 'Invalid OTP!' }));
        } else {
          dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
        }
      }
    } catch (error) {
      dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
      removeLogin();
      removeIsProfessional();
      removeAppliedProfessionalCategories();
      removeCategories();
      removeIsRegisteredUser();
      dispatch({ type: 'USER_LOGOUT' });
    }
    setShowLoader(false);
  };

  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     navigate('/', { replace: true });
  //   }
  // }, []);

  return (
    <div>
      <AppBar position='relative' sx={{ backgroundColor: '#f8f7f1' }}>
        <Toolbar disableGutters>
          <div
            onClick={() => navigate('/', { replace: 'true' })}
            style={{ cursor: 'pointer', marginLeft: '1rem' }}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <div className='loginForm'>
        <div>
          <Typography variant='h3' sx={{ fontSize: '2rem', fontWeight: '500' }}>
            Welcome Back
          </Typography>
        </div>
        <br />
        <div className='inputLoginTextBox'>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Enter email address'
            autoComplete='true'
            fullWidth={true}
            onChange={emailIdInputCallback}
          />
          {!isValidEmail && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
        </div>
        {showOtp && (
          <div className='inputLoginTextBox'>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Enter OTP'
              autoComplete='true'
              fullWidth={true}
              onChange={otpInputCallback}
            />
          </div>
        )}
        {!showOtp && (
          <div className='continueBtn' onClick={_handleSendOtp}>
            {!showLoader && (
              <Typography
                variant='h6'
                className='btnText'
                sx={{ fontSize: '1rem', fontWeight: '500' }}>
                Continue
              </Typography>
            )}
            {showLoader && <CircularProgress sx={{ color: 'white' }}></CircularProgress>}
          </div>
        )}
        {showOtp && (
          <div className='afterContinueDiv'>
            <div className='continueBtn' onClick={_verifyOtp}>
              {!showLoader && (
                <Typography
                  variant='h6'
                  className='btnText'
                  sx={{ fontSize: '1rem', fontWeight: '500' }}>
                  Submit
                </Typography>
              )}
              {showLoader && <CircularProgress sx={{ color: 'white' }}></CircularProgress>}
            </div>
            <div className='otpResendDiv'>
              <div>
                <p style={{ fontSize: '0.8rem', padding: '1rem' }}>Didn&apos;t receive code? </p>
              </div>
              <div>
                {!showResendOtp && !isNaN(timeLeft) && (
                  <Typography>
                    {Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, '0') +
                      ':' +
                      Math.floor(timeLeft % 60)
                        .toString()
                        .padStart(2, '0')}
                  </Typography>
                )}
                {showResendOtp && (
                  <button
                    onClick={_handleSendOtp}
                    style={{
                      backgroundColor: 'white',
                      border: '0',
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: '#009EF7',
                      cursor: 'pointer',
                    }}>
                    RESEND
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <div style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '1rem' }}>
          By continuing, you agree to our{' '}
          <span>
            <a
              href={window.location.origin + '/terms-and-conditions'}
              target='_blank'
              rel='noreferrer'>
              Terms of Service
            </a>
          </span>{' '}
          and{' '}
          <span>
            <a href={window.location.origin + '/privacy-policy'} target='_blank' rel='noreferrer'>
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
