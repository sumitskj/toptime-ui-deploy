import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
  Toolbar,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoWithName } from '../../../components/logo/Logo';
import './bookingInfo.css';
import { getBookingStatusFromValue, getBookingTypeFromValue } from '../../../utils/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { fetchBookingById } from '../../common/api/bookingData';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { openNotification } from '../../notifications/slice/notification';
import {
  cancelBooking,
  confirmBooking,
  rescheduleBooking,
  submitFeedback,
} from './api/bookingOperations';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const ProfessionalBookingInfo = () => {
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

  const joinMeeting = () => {
    window.open(
      `${process.env.REACT_APP_MEETING_URI}/${booking.bookingId}/professional?auth_token=${authData.authData.accessToken}`,
      '_blank',
    );
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
        console.error('Error in loading fetching booking: ', err);
        setError(true);
        if (err.status === 403 || err.status === 401) {
          navigate('/forbidden');
        }
      }
      setLoading(false);
    };
    fetchBookingData();
  }, []);

  // handle accept booking
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const handleAcceptDialogOpen = () => {
    setOpenAcceptDialog(true);
  };

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

  const handleAcceptDialogClose = (event, reason) => {
    if (reason && reason == 'backdropClick') return;
    setOpenAcceptDialog(false);
  };

  const AcceptBookingDialog = () => {
    return (
      <Dialog open={openAcceptDialog} onClose={handleAcceptDialogClose}>
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

  // handle cancel booking
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const handleCancelDialogOpen = () => {
    setOpenCancelDialog(true);
  };
  const handleCancelDialogClose = (event, reason) => {
    if (reason && reason == 'backdropClick') return;
    setOpenCancelDialog(false);
  };
  const handleCancelBooking = async () => {
    if (!isOnline) {
      dispatch(openNotification({ severity: 'error', message: 'You are offline!' }));
      return;
    }
    if (actionBtnLoading) return;
    try {
      setActionBtnLoading(true);
      const payload = {
        bookingId: bookingId,
        cancellationTime: new Date(booking.initialBookingTime).toISOString(),
        isUser: 'false',
      };
      console.log('booking cancel payload: ', payload);
      const confirmRes = await dispatch(cancelBooking(payload)).unwrap();
      if (confirmRes.ok) {
        booking.status = 9;
        setBooking(booking);
        dispatch(
          openNotification({ severity: 'success', message: 'Your booking cancelled successfully' }),
        );
      } else {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Unable to cancel booking. Something went wrong. Please try again',
          }),
        );
      }
    } catch (err) {
      dispatch(
        openNotification({ severity: 'error', message: 'Something went wrong. Please try again' }),
      );
    }
    handleCancelDialogClose();
    setActionBtnLoading(false);
  };

  const CancelBookingDialog = () => {
    return (
      <Dialog open={openCancelDialog} onClose={handleCancelDialogClose}>
        <DialogTitle>Do you want to cancel the booking?</DialogTitle>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}>
            <Button onClick={handleCancelBooking}>
              {actionBtnLoading ? (
                <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'black' }} />
              ) : (
                'Yes'
              )}
            </Button>
            <Button onClick={handleCancelDialogClose}>No</Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };

  // handle reschedule booking
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);

  const handleRescheduleDialogOpen = () => {
    setOpenRescheduleDialog(true);
  };
  const handleRescheduleDialogClose = (event, reason) => {
    if (reason && reason == 'backdropClick') return;
    setOpenRescheduleDialog(false);
  };

  const RescheduleBookingDialog = () => {
    const [time1, setTime1] = useState(() => null);
    const [time2, setTime2] = useState(() => null);
    const [time3, setTime3] = useState(() => null);
    const [time4, setTime4] = useState(() => null);

    const handleRescheduleBooking = async () => {
      const timeOptions = [];
      if (time1 !== null) timeOptions.push(time1.toISOString());
      if (time2 !== null) timeOptions.push(time2.toISOString());
      if (time3 !== null) timeOptions.push(time3.toISOString());
      if (time4 !== null) timeOptions.push(time4.toISOString());
      console.log(JSON.stringify(timeOptions));
      if (timeOptions.length < 2) {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Please select atleast 2 new timings',
          }),
        );
        return;
      }
      if (!isOnline) {
        dispatch(openNotification({ severity: 'error', message: 'You are offline!' }));
        return;
      }
      if (actionBtnLoading) return;

      try {
        setActionBtnLoading(true);
        const payload = {
          bookingId: bookingId,
          bookingTimingProfessionalOptions: timeOptions,
        };
        console.log('booking reschedule payload: ', payload);
        const confirmRes = await dispatch(rescheduleBooking(payload)).unwrap();
        if (confirmRes.ok) {
          booking.status = 2;
          setBooking(booking);
          dispatch(
            openNotification({
              severity: 'success',
              message: 'Your booking reschedule request sent successfully',
            }),
          );
        } else {
          dispatch(
            openNotification({
              severity: 'error',
              message:
                'Unable to send reschedule booking request. Something went wrong. Please try again',
            }),
          );
        }
      } catch (err) {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Something went wrong. Please try again',
          }),
        );
      }
      handleRescheduleDialogClose();
      setActionBtnLoading(false);
    };

    return (
      <Dialog open={openRescheduleDialog} onClose={handleRescheduleDialogClose}>
        <DialogTitle>Reschedule Booking</DialogTitle>
        <DialogContent>
          <div style={{ color: 'grey', padding: '10px', textAlign: 'center' }}>
            Select atleast 2 new timings for booking
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label='Select time'
                    value={time1}
                    disablePast
                    onChange={(newValue) => setTime1(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label='Select time'
                    value={time2}
                    disablePast
                    onChange={(newValue) => setTime2(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label='Select time'
                    value={time3}
                    disablePast
                    onChange={(newValue) => setTime3(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label='Select time'
                    value={time4}
                    disablePast
                    onChange={(newValue) => setTime4(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}>
            <Button onClick={handleRescheduleBooking}>
              {actionBtnLoading ? (
                <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'black' }} />
              ) : (
                'Submit'
              )}
            </Button>
            <Button onClick={handleRescheduleDialogClose}>Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };

  // handle fill feedback form
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);

  const handleFeedbackDialogOpen = () => {
    setOpenFeedbackDialog(true);
  };
  const handleFeedbackDialogClose = () => {
    setOpenFeedbackDialog(false);
  };

  const FillFeedbackDialog = () => {
    const [satisfied, setSatisfied] = useState(() => 2);
    const [feedback, setFeedback] = useState(() => '');
    const feedbackInputCallback = (event) => {
      setFeedback(event.target.value);
    };

    const handleFillFeedback = async () => {
      if (!isOnline) {
        dispatch(openNotification({ severity: 'error', message: 'You are offline!' }));
        return;
      }
      if (actionBtnLoading) return;

      try {
        setActionBtnLoading(true);
        const payload = {
          bookingId: bookingId,
          feedbackStatus: satisfied,
          feedback: feedback,
          isProfessional: true,
        };
        console.log('submit feedback payload: ', payload);
        const confirmRes = await dispatch(submitFeedback(payload)).unwrap();
        if (confirmRes.ok) {
          booking.professionalCompleteStatusFeedback = feedback;
          setBooking(booking);
          dispatch(
            openNotification({ severity: 'success', message: 'Feedback submitted successfully' }),
          );
        } else {
          dispatch(
            openNotification({
              severity: 'error',
              message: 'Unable to submit feedback. Something went wrong. Please try again',
            }),
          );
        }
      } catch (err) {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Something went wrong. Please try again',
          }),
        );
      }
      handleFeedbackDialogClose();
      setActionBtnLoading(false);
    };

    return (
      <Dialog open={openFeedbackDialog} onClose={handleFeedbackDialogClose}>
        <DialogTitle sx={{ fontSize: '1.4rem' }}>
          How was your call? Please give us a feedback, to improve your experience
        </DialogTitle>
        <hr style={{ width: '100%', backgroundColor: '#9E9E9EFF', height: '1px', border: '0' }} />
        <div
          style={{
            position: 'relative',
            width: '100%',
          }}>
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 2rem',
            }}>
            <div style={{ fontWeight: '400' }}>Rating</div>
            <Rating
              size='large'
              value={rating}
              precision={0.5}
              onChange={(event, newRating) => setRating(newRating)}
            />
          </div> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 2rem',
            }}>
            <div style={{ fontWeight: '400' }}>Are you satisfied with the call</div>
            <div>
              <RadioGroup
                row
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={satisfied}
                onChange={(event) => setSatisfied(event.target.value)}>
                <FormControlLabel value={2} control={<Radio color='success' />} label='Yes' />
                <FormControlLabel value={1} control={<Radio color='success' />} label='No' />
              </RadioGroup>
            </div>
          </div>
          <div
            style={{
              padding: '1rem 2rem',
            }}>
            <div>Feedback</div>
            <div
              style={{
                marginTop: '1rem',
                borderRadius: '10px',
                padding: '0.4rem',
                border: '1px solid grey',
              }}>
              <InputBase
                placeholder='I had a nice time...'
                autoComplete='true'
                fullWidth={true}
                multiline={true}
                value={feedback}
                onChange={feedbackInputCallback}
              />
            </div>
          </div>
        </div>
        <DialogActions>
          <div
            style={{
              position: 'relative',
              width: '100%',
              margin: '1rem',
            }}>
            <Button
              style={{ width: '100%', backgroundColor: 'black', color: 'white' }}
              onClick={handleFillFeedback}>
              {actionBtnLoading ? (
                <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'black' }} />
              ) : (
                'Save my experience'
              )}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#FFECEC' }}>
        <AppBar position='sticky' sx={{ backgroundColor: '#FFECEC' }}>
          <Toolbar disableGutters>
            <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
              <LogoWithName />
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
                <span style={{ fontWeight: '200', fontSize: '1rem' }}>at</span>{' '}
                {moment(
                  booking.status < 3 ||
                    booking.finalBookingTime === null ||
                    booking.finalBookingTime.length === 0
                    ? booking.initialBookingTime
                    : booking.finalBookingTime,
                ).format('DD MMM YYYY hh:mm A')}
              </div>
              <div className='bookingIdDiv'>
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
              <div className='bookingIdDiv'>
                <div
                  style={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    wordBreak: 'break-word',
                  }}>
                  <span style={{ fontWeight: '200', fontSize: '0.8rem' }}>
                    Hide Customer Details:
                  </span>{' '}
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
                      onClick={handleFeedbackDialogOpen}
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
              <FillFeedbackDialog />
              {(booking.status === 4 ||
                (booking.status === 3 &&
                  moment(booking.finalBookingTime)
                    .add(booking.duration + 15, 'minutes')
                    .isAfter(moment()) &&
                  moment(booking.finalBookingTime).add(-10, 'minutes').isBefore(moment()))) && (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    margin: '1rem',
                  }}>
                  <Button
                    onClick={joinMeeting}
                    style={{ width: '80%', backgroundColor: 'black', color: 'white' }}>
                    Join
                  </Button>
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
                        onClick={handleRescheduleDialogOpen}
                        style={{
                          color: 'white',
                          backgroundColor: '#FF9429',
                          border: '0px',
                          borderRadius: '10px',
                          padding: '10px',
                          fontWeight: '600',
                        }}>
                        Reschedule
                      </button>
                    </div>
                  )}
                  <RescheduleBookingDialog />
                  <div>
                    <button
                      onClick={handleCancelDialogOpen}
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
                  <CancelBookingDialog />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessionalBookingInfo;
