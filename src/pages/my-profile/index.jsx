import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import './myProfile.css';
import { deleteAccount, getUserDetails } from './api/myProfile';
import { setMyUserDetails } from './slice/myProfile';
import { openNotification } from '../notifications/slice/notification';
import {
  removeAppliedProfessionalCategories,
  removeCategories,
  removeIsProfessional,
  removeIsRegisteredUser,
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleAccountDeletion = () => {
    const deleteRequest = async () => {
      try {
        const resp = await dispatch(deleteAccount()).unwrap();
        if (resp.ok) {
          console.log('Account deleted successfully');
          dispatch(
            openNotification({
              severity: 'success',
              message: 'Account deleted successfully',
            }),
          );
        }
      } catch (err) {
        console.error('Error in Account deleted : ', err);
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Error in account deletion. Please try agan.',
          }),
        );
      }
    };
    deleteRequest();
    handleLogout();
    setOpenDeleteDialog(false);
    navigate('/', { replace: 'true' });
  };

  const DeleteAccountDialog = () => {
    return (
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>Do you really want to delete your account?</DialogContent>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}>
            <button
              onClick={() => setOpenDeleteDialog(false)}
              style={{
                border: 0,
                padding: '10px',
                backgroundColor: 'white',
                color: '#E44332',
                fontWeight: '550',
                fontSize: '1.1rem',
                marginRight: '1rem',
                cursor: 'pointer',
              }}>
              Cancel
            </button>
            <button
              onClick={() => setOpenDeleteDialog(true)}
              style={{
                borderRadius: '8px',
                border: 0,
                padding: '10px',
                backgroundColor: 'black',
                color: 'white',
                fontWeight: '550',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
              Delete
            </button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };

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
    removeCategories();
    removeIsRegisteredUser();
    dispatch(removeLoginRedux());
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/', { replace: 'true' });
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
            <DeleteAccountDialog />
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
