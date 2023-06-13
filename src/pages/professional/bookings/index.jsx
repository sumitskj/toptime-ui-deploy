import { Typography, Button } from '@mui/material';
import './bookings.css';
import { useEffect, useState } from 'react';
import { setBookings } from './slice/bookings';
import { getProfessionalBookings } from './api/bookings';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getBookingStatusFromValue, getBookingTypeFromValue } from '../../../utils/enums';
import { openNotification } from '../../notifications/slice/notification';
import { find } from 'lodash';

const ProfessionalBookings = () => {
  const pageSize = 15;
  const [activeState, setActiveState] = useState(0);
  const [loading, setLoading] = useState(() => false);
  const [error, setError] = useState(() => false);
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.professionalBookings);
  const categoriesData = useSelector((state) => state.categories);
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeTab = (index) => {
    setActiveState(index);
  };

  const openBooking = (booking) => {
    window.open(`${window.location.origin}/professional/booking/` + booking.bookingId, '_blank');
  };

  const findCategory = (query, returnKey = 'id') => {
    const findItem = find(categoriesData, { ...query });
    if (findItem) {
      return findItem[returnKey];
    }
    // default category
    return '';
  };

  const [curPageNum, setCurPageNum] = useState(() => [0, 0, 0]);

  useEffect(() => {
    if (!authData.isAuthenticated) {
      dispatch(
        openNotification({ severity: 'error', message: 'Please login first to access that page!' }),
      );
      navigate('/');
    }
    const initBookings = async () => {
      setLoading(true);
      await Promise.all([
        fetchBookings(0, curPageNum[0]),
        fetchBookings(1, curPageNum[1]),
        fetchBookings(2, curPageNum[2]),
      ]);
      setLoading(false);
    };
    initBookings();
  }, []);

  const handlePageChange = (curPage) => {
    curPageNum[activeState] = curPage;
    setCurPageNum(curPageNum);
    setLoading(true);
    fetchBookings(activeState, curPageNum[activeState]);
    setLoading(false);
  };

  const fetchBookings = async (state, pageNum) => {
    try {
      const query = `?status=${state}&page=${pageNum}&limit=${pageSize}`;
      console.log('auth : ', authData.accessToken);
      const resp = await getProfessionalBookings(query, authData.authData.accessToken);
      if (resp.ok) {
        const respJson = await resp.json();
        console.log('Professional bookings response:: ', respJson);
        dispatch(setBookings({ id: state, data: respJson }));
      } else {
        setError(true);
      }
    } catch (err) {
      console.log('Error: fetch professional bookings::', err);
      setError(true);
    }
  };

  return (
    <>
      <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <div className='tabItems'>
          <div
            className={`tabBtn ${activeState === 0 ? 'tabActive' : 'tabInactive'}`}
            onClick={() => changeTab(0)}>
            Inprogress
          </div>
          <div
            className={`tabBtn ${activeState === 1 ? 'tabActive' : 'tabInactive'}`}
            onClick={() => changeTab(1)}>
            Completed
          </div>
          <div
            className={`tabBtn ${activeState === 2 ? 'tabActive' : 'tabInactive'}`}
            onClick={() => changeTab(2)}>
            Cancelled
          </div>
        </div>
        <div className='bookingsDiv'>
          {loading && <ProfessionalCardSkeleton />}
          {!error && !loading && bookingData[activeState].length === 0 && (
            <Typography>
              No{' '}
              {activeState === 0 ? 'Inprogress ' : activeState === 1 ? 'Completed ' : 'Cancelled '}
              Bookings found
            </Typography>
          )}
          {error && (
            <Typography>Something went wrong. Please try refreshing page again.</Typography>
          )}
          {!error && !loading && bookingData[activeState].length !== 0 && (
            <>
              {bookingData[activeState].map((booking, index) => (
                <div key={index} className='bookingCardDiv' onClick={() => openBooking(booking)}>
                  <div className='bookingHeadingDiv'>
                    <div style={{ padding: '12px' }}>
                      {booking.isAnonymous === 1
                        ? booking.userFirstName + ' ' + booking.userLastName
                        : '*********'}
                    </div>
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: '20px',
                        backgroundColor: '#D6EFFF',
                        textAlign: 'center',
                        margin: '12px',
                        fontSize: '0.8rem',
                      }}>
                      {getBookingStatusFromValue(booking.status)}
                    </div>
                  </div>
                  <div className='bookingDataDiv'>
                    <div className='dataDivLeft'>
                      <div>
                        {moment(
                          booking.finalBookingTime === null || booking.finalBookingTime.length === 0
                            ? booking.initialBookingTime
                            : booking.finalBookingTime,
                        ).format('DD MMM YYYY hh:mm A')}
                      </div>
                      <br />
                      <div>{findCategory({ id: booking.category }, 'label')}</div>
                    </div>
                    <div className='dataDivRight'>
                      <div>
                        {getBookingTypeFromValue(booking.bookingType) +
                          ' (' +
                          booking.duration +
                          ' min)'}
                      </div>
                      <br />
                      <div
                        style={{
                          padding: '8px',
                          backgroundColor: '#ECF7F0',
                          color: '#48705B',
                          borderRadius: '20px',
                        }}>
                        ₹{booking.totalAmount}
                      </div>
                    </div>
                  </div>
                  {(booking.status === 4 ||
                    (booking.status === 3 &&
                      moment(booking.finalBookingTime)
                        .add(booking.duration + 15, 'minutes')
                        .isAfter(moment()) &&
                      moment(booking.finalBookingTime).add(-10, 'minutes').isBefore(moment()))) && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                        width: '100%',
                        margin: '1rem',
                      }}>
                      <Button
                        style={{
                          margin: 'auto',
                          width: '80%',
                          backgroundColor: 'black',
                          color: 'white',
                        }}>
                        Join
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className='paginationDiv'>
          {bookingData[activeState].length === pageSize && (
            <>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid grey',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  marginRight: '1rem',
                }}
                onClick={() => handlePageChange(curPageNum[activeState] + 1)}>
                Next
              </div>
            </>
          )}
          {curPageNum[activeState] > 0 && (
            <>
              <div
                onClick={() => handlePageChange(curPageNum[activeState] - 1)}
                style={{
                  padding: '10px',
                  border: '1px solid grey',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  marginRight: '1rem',
                }}>
                Previous
              </div>
            </>
          )}
          {!error && (
            <div
              style={{
                color: 'grey',
              }}>
              Page : {curPageNum[activeState] + 1}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessionalBookings;
