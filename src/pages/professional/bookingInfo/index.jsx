import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Toolbar,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../components/logo/Logo';
import './bookingInfo.css';
import { getBookingStatusFromValue, getBookingTypeFromValue } from '../../../utils/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { fetchBookingById } from '../../common/api/bookingData';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { openNotification } from '../../notifications/slice/notification';
import { confirmBooking } from './api/bookingOperations';

const BookingInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookingId = location.pathname.substring(22);
  const authData = useSelector((state) => state.auth);
  const [booking, setBooking] = useState(() => null);
  const [loading, setLoading] = useState(() => false);
  const [error, setError] = useState(() => false);
  const [actionBtnLoading, setActionBtnLoading] = useState(() => false);

  const handleNavigateHome = () => {
    navigate('/');
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!authData.isAuthenticated) {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Please login first to access that page!',
          }),
        );
        navigate('/');
      }
      try {
        setLoading(true);
        const bookingRes = await dispatch(fetchBookingById(bookingId)).unwrap();
        if (bookingRes.ok) {
          setBooking(await bookingRes.json());
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchBookingData();
  }, []);

  const handleAcceptBooking = async () => {
    if (!isOnline) {
      dispatch(openNotification({ severity: 'error', message: 'You are offline!' }));
      return;
    }
    if (actionBtnLoading) return;
    try {
      setActionBtnLoading(true);
      const payload = {
        bookingId: bookingId,
        finalBookingTime: new Date(booking.initialBookingTime).toISOString(),
      };
      console.log('booking confimation payload: ', payload);
      const confirmRes = await dispatch(confirmBooking(payload)).unwrap();
      if (confirmRes.ok) {
        booking.status = 3;
        setBooking(booking);
        dispatch(
          openNotification({ severity: 'success', message: 'Your booking confirmed successfully' }),
        );
      } else {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Unable to confirm booking. Something went wrong. Please try again',
          }),
        );
      }
    } catch (err) {
      dispatch(
        openNotification({ severity: 'error', message: 'Something went wrong. Please try again' }),
      );
    }
    handleAcceptDialogClose();
    setActionBtnLoading(false);
  };

  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const handleAcceptDialogOpen = () => {
    setOpenAcceptDialog(true);
  };

  const handleAcceptDialogClose = (event, reason) => {
    if (reason && reason == 'backdropClick') return;
    setOpenAcceptDialog(false);
  };

  const AcceptBookingDialog = () => {
    return (
      <Dialog open={openAcceptDialog} onClose={handleAcceptDialogClose} onBac>
        <DialogTitle>Do you want to accept the booking?</DialogTitle>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}>
            <Button onClick={handleAcceptBooking}>
              {actionBtnLoading ? (
                <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'black' }} />
              ) : (
                'Yes'
              )}
            </Button>
            <Button onClick={handleAcceptDialogClose}>NO</Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };

  // const handleRescheduleBooking = () => {};
  // const handleCancelBooking = () => {};
  // const handleFillFeedback = () => {};

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#D6EFFF' }}>
        <AppBar position='sticky' sx={{ backgroundColor: '#D6EFFF' }}>
          <Toolbar disableGutters>
            <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
              <Logo />
            </div>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}>
          <div style={{ fontWeight: '500', fontSize: '1.6rem' }}>Booking Details</div>
          {loading && <ProfessionalCardSkeleton />}
          {error && (
            <div style={{ fontSize: '1.2rem', marginTop: '2rem', textAlign: 'center' }}>
              Some error occurred. Please try again after sometime
            </div>
          )}
          {!loading && !error && booking !== null && (
            <div className='bookingDetailDiv'>
              <Avatar
                sx={{
                  backgroundColor: '#E44332',
                  width: '100px',
                  height: '100px',
                  fontSize: '4rem',
                }}>
                {booking.userFirstName.substring(0, 1)}
              </Avatar>
              <div style={{ fontWeight: '500', fontSize: '1.2rem', marginTop: '2rem' }}>
                <span style={{ fontWeight: '200', fontSize: '1rem' }}>Booking scheduled with </span>
                {booking.isAnonymous === 1
                  ? booking.userFirstName + ' ' + booking.userLastName
                  : '*********'}
              </div>
              <div style={{ fontWeight: '500', fontSize: '1rem', marginTop: '1rem' }}>
                {getBookingTypeFromValue(booking.bookingType)}{' '}
                <span style={{ fontWeight: '200', fontSize: '1rem' }}>for</span> {booking.duration}{' '}
                mins
              </div>
              <div style={{ fontWeight: '500', fontSize: '1rem', marginTop: '1rem' }}>
                <span style={{ fontWeight: '200', fontSize: '1rem' }}>At</span>{' '}
                {moment(
                  booking.finalBookingTime === null || booking.finalBookingTime.length === 0
                    ? booking.initialBookingTime
                    : booking.finalBookingTime,
                ).format('DD MMM YYYY hh:mm A')}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: '2rem',
                  position: 'relative',
                  width: '100%',
                }}>
                <div
                  style={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    wordBreak: 'break-word',
                  }}>
                  <span style={{ fontWeight: '200', fontSize: '0.8rem' }}>Booking Id:</span>{' '}
                  {booking.bookingId}
                </div>
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '20px',
                    backgroundColor: '#D6EFFF',
                    margin: '12px',
                    fontSize: '0.8rem',
                  }}>
                  {getBookingStatusFromValue(booking.status)}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  position: 'relative',
                  width: '100%',
                }}>
                <div
                  style={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    wordBreak: 'break-word',
                  }}>
                  <span style={{ fontWeight: '200', fontSize: '0.8rem' }}>Hide Details:</span>{' '}
                  {booking.isAnonymous === 0 ? 'Yes' : 'No'}
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div style={{ fontWeight: '200', fontSize: '0.8rem' }}>Booking Amount:</div>
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '20px',
                      backgroundColor: '#ECF7F0',
                      color: '#48705B',
                      margin: '12px',
                    }}>
                    ₹{booking.totalAmount}
                  </div>
                </div>
              </div>
              {booking.userCompleteStatusFeedback !== 0 && (
                <div className='feedbackDiv'>
                  <hr style={{ color: 'grey', position: 'relative', width: '100%' }} />

                  <div>
                    <span style={{ fontWeight: '200', fontSize: '0.8rem' }}>
                      Is customer satisfied with the call:
                    </span>{' '}
                    {booking.userCompleteStatusFeedback === 2 ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span style={{ fontWeight: '200', fontSize: '0.8rem' }}>Rating:</span>{' '}
                    {booking.rating}/5
                  </div>
                  <div>
                    <span style={{ fontWeight: '200', fontSize: '0.8rem' }}>
                      Customer feedback:
                    </span>{' '}
                    {booking.userFeedback}
                  </div>
                </div>
              )}
              {booking.status >= 5 &&
                booking.status < 8 &&
                booking.professionalCompleteStatusFeedback === 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <button
                      style={{
                        color: 'white',
                        backgroundColor: '#009EF7',
                        border: '0px',
                        borderRadius: '10px',
                        padding: '10px',
                        fontWeight: '600',
                      }}>
                      Fill feedback form
                    </button>
                  </div>
                )}
              {booking.status <= 3 && (
                <div
                  className='bookingBtn'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: '2rem',
                    position: 'relative',
                    width: '100%',
                  }}>
                  {booking.status < 2 && (
                    <div>
                      <button
                        onClick={handleAcceptDialogOpen}
                        style={{
                          color: 'white',
                          backgroundColor: '#03C988',
                          border: '0px',
                          borderRadius: '10px',
                          padding: '10px',
                          fontWeight: '600',
                        }}>
                        Accept
                      </button>
                    </div>
                  )}
                  <AcceptBookingDialog />
                  {(booking.status === 3 || booking.status === 1) && (
                    <div>
                      <button
                        style={{
                          color: 'white',
                          backgroundColor: '#FF9429',
                          border: '0px',
                          borderRadius: '10px',
                          padding: '10px',
                          fontWeight: '600',
                        }}>
                        Reschdule
                      </button>
                    </div>
                  )}
                  <div>
                    <button
                      style={{
                        color: 'white',
                        backgroundColor: '#FF2626',
                        border: '0px',
                        borderRadius: '10px',
                        padding: '10px',
                        fontWeight: '600',
                      }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingInfo;
