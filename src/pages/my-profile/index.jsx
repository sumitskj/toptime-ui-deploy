import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@mui/material';

import { getUserDetails } from './api/myProfile';
import { setMyUserDetails } from './slice/myProfile';
import { openNotification } from '../notifications/slice/notification';
import { removeLogin } from '../../utils/loginStore';
import { removeLogin as removeLoginRedux } from '../login/slice/login';

const ProfilePropText = ({ label, value }) => {
  return (
    <>
      <Typography variant='h6' component='div' gutterBottom>
        {label}
      </Typography>
      <Typography variant='body1' component='div' gutterBottom>
        {value}
      </Typography>
    </>
  );
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myData = useSelector((state) => state.myProfile);

  const fetchMyProfile = async () => {
    try {
      const resp = await dispatch(getUserDetails()).unwrap();
      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setMyUserDetails(resJson));
      }
    } catch (error) {
      console.log('Error:: fetch Profile::: ', error);
      if (error.status === 401) {
        dispatch(
          openNotification({ severity: 'error', message: 'Session expired. Please login again.' }),
        );
        // trigger logout
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    removeLogin();
    dispatch(removeLoginRedux());
    navigate('/login');
  };

  const handleAccountDeletion = () => {
    // TODO: confirm dialog and API integration
    dispatch(
      openNotification({ severity: 'info', message: 'Account deletion request submitted.' }),
    );
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ padding: '2rem 4rem' }}>
        <Typography variant='h5' component='div' gutterBottom>
          Profile
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={8} xl={6} sx={{ padding: '2rem 4rem' }}>
        <Paper elevation={2} sx={{ padding: '2rem 4rem' }}>
          <ProfilePropText label='Name' value={`${myData.firstName} ${myData.lastName}`} />
          <ProfilePropText label='Email address' value={myData.emailId} />
          <ProfilePropText label='Mobile number' value={myData.mobileNumber} />
          <Grid container justifyContent='space-between'>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0' }}>
              <Button variant='contained' onClick={handleLogout}>
                Log Out
              </Button>
              <Button
                variant='contained'
                sx={{ background: '#FF0707' }}
                onClick={handleAccountDeletion}>
                Delete my account
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

ProfilePropText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MyProfile;
