import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUpcomingUserBooking } from './api/userHomeApi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { find } from 'lodash';

const UserUpcomingBooking = () => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.categories);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const bookingRes = await dispatch(
          getUpcomingUserBooking({ isProfessional: false }),
        ).unwrap();
        if (bookingRes.ok) {
          const bookingJson = await bookingRes
            .json()
            .catch(() => console.log('No user bookings upcoming'));
          setBooking(bookingJson === undefined ? null : bookingJson);
        }
      } catch (err) {
        console.error('Error in fetching user upcoming booking ', err);
        setError(true);
      }
      setLoading(false);
    };
    fetchBooking();
  }, []);

  const findCategory = (query) => {
    const findItem = find(categoriesData, { ...query });
    console.log('**** ', findItem);
    if (findItem) {
      return findItem.label;
    }
    // default category
    return 'Others';
  };

  const handleOpenBooking = () => {
    window.open(`${window.location.origin}/user/booking/` + booking.bookingId, '_blank');
  };

  return (
    <Box
      sx={{
        pl: { xs: '0rem', md: '4rem' },
        pr: { xs: '0rem', md: '4rem' },
        pt: '2rem',
        mt: '1rem',
        backgroundColor: 'white',
      }}>
      {!error && !loading && booking !== null && (
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
              m: { xs: '12px', md: '16px' },
              fontWeight: '600',
            }}>
            Upcoming Booking
          </Typography>
          <Grid item xs={9}>
            <Box
              onClick={handleOpenBooking}
              sx={{
                cursor: 'pointer',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: { xs: 'center', md: 'flex-start' },
                flexDirection: 'column',
                position: 'relative',
                width: '90%',
                padding: '12px 20px',
                background: 'linear-gradient(90deg, #E77 12.30%, #D92424 100%)',
                fontWeight: '600',
              }}>
              <Box sx={{ color: 'white' }}>
                Time: {moment(booking.finalBookingTime).format('DD MMM YYYY hh:mm A')}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  flexDirection: { xs: 'column', md: 'row' },
                  width: '100%',
                  color: 'white',
                }}>
                <div>
                  {booking.bookingType === 0 ? 'Voice' : 'Video'} Call with{' '}
                  {booking.professionalFirstName} {booking.professionalLastName}
                </div>
                <div>{findCategory({ id: booking.category })}</div>
                <div>Duration: {booking.duration} min</div>
                <div></div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      {loading && (
        <Grid item xs={12}>
          <ProfessionalCardSkeleton />
        </Grid>
      )}
      {error && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
          }}>
          Something went wrong. Please try again or check your internet connection.
        </Box>
      )}
    </Box>
  );
};

export default UserUpcomingBooking;
