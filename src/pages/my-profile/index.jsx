import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import './myProfile.css';
import { getUserDetails } from './api/myProfile';
import { setMyUserDetails } from './slice/myProfile';
import { openNotification } from '../notifications/slice/notification';
import {
  removeAppliedProfessionalCategories,
  removeIsProfessional,
  removeLogin,
} from '../../utils/loginStore';
import { removeLogin as removeLoginRedux } from '../login/slice/login';
import ProfessionalCardSkeleton from '../../components/skeleton/ProfessionalCardSkeleton';

const ProfilePropText = ({ label, value }) => {
  return (
    <>
      <Typography component='div' gutterBottom style={{ fontWeight: '300' }}>
        {label}
      </Typography>
      <Typography component='div' gutterBottom style={{ fontWeight: '600' }}>
        {value}
      </Typography>
    </>
  );
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myData = useSelector((state) => state.myProfile);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const fetchMyProfile = async () => {
    try {
      setLoader(true);
      const resp = await dispatch(getUserDetails()).unwrap();
      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setMyUserDetails(resJson));
      }
    } catch (err) {
      console.log('Error:: fetch Profile::: ', err);
      setError(true);
      if (error.status === 401) {
        dispatch(
          openNotification({ severity: 'error', message: 'Session expired. Please login again.' }),
        );
        // trigger logout
        handleLogout();
      }
    }
    setLoader(false);
  };

  const handleLogout = () => {
    removeLogin();
    removeIsProfessional();
    removeAppliedProfessionalCategories();
    dispatch(removeLoginRedux());
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/');
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
    <div className='myProfileParentDiv'>
      {loading && <ProfessionalCardSkeleton />}
      {error && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Typography>Something went wrong. Please try refreshing page again.</Typography>
        </div>
      )}
      {!loading && !error && (
        <div className='myProfileCardDiv'>
          <div className='contentDiv'>
            <ProfilePropText label='Name' value={myData.firstName + ' ' + myData.lastName} />
          </div>
          <hr
            style={{
              width: '100%',
              backgroundColor: '#ededed',
              height: '1px',
              border: '0',
            }}
          />
          <div className='contentDiv'>
            <ProfilePropText label='Email Address' value={myData.emailId} />
          </div>
          <hr
            style={{
              width: '100%',
              backgroundColor: '#ededed',
              height: '1px',
              border: '0',
            }}
          />
          {myData.mobileNumber !== null && (
            <>
              <div className='contentDiv'>
                <ProfilePropText label='Mobile number' value={myData.mobileNumber} />
              </div>
              <hr
                style={{
                  width: '100%',
                  backgroundColor: '#ededed',
                  height: '1px',
                  border: '0',
                }}
              />
            </>
          )}
          <div className='buttonDiv'>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px',
                fontWeight: '600',
                backgroundColor: 'red',
                border: '0',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
              }}>
              Log Out
            </button>
            <button
              onClick={handleAccountDeletion}
              style={{
                padding: '10px',
                fontWeight: '200',
                backgroundColor: 'white',
                border: '1px solid red',
                borderRadius: '10px',
                color: 'red',
                cursor: 'pointer',
              }}>
              Delete Account
            </button>
          </div>

          <div className='footerDiv'>
            <div>
              <a
                href='https://toptime.s3.ap-south-1.amazonaws.com/static-sites/about-us.html'
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'none', color: 'grey', fontSize: '0.9rem' }}>
                About Us
              </a>
            </div>
            <div>
              <a
                href='https://toptime.s3.ap-south-1.amazonaws.com/static-sites/terms-conditions.html'
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'none', color: 'grey', fontSize: '0.9rem' }}>
                Terms and Conditions
              </a>
            </div>
            <div>
              <a
                href='https://toptime.s3.ap-south-1.amazonaws.com/static-sites/privacy-policy.html'
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'none', color: 'grey', fontSize: '0.9rem' }}>
                Privacy Policy
              </a>
            </div>
            <div>
              <a
                href='https://toptime.s3.ap-south-1.amazonaws.com/static-sites/cancellation-refund.html'
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'none', color: 'grey', fontSize: '0.9rem' }}>
                Cancellation and Refunds
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfilePropText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MyProfile;
