import { Typography } from '@mui/material';
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
  const [activeState, setActiveState] = useState(0);
  const [loading, setLoading] = useState(() => false);
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.professionalBookings);
  const categoriesData = useSelector((state) => state.categories);
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeTab = (index) => {
    setActiveState(index);
  };

  const openBooking = (booking) => {
    navigate('/professional/booking/' + booking.bookingId, {
      state: { booking: booking.bookingId },
    });
  };

  const findCategory = (query, returnKey = 'id') => {
    const findItem = find(categoriesData, { ...query });
    if (findItem) {
      return findItem[returnKey];
    }
    // default category
    return returnKey === 'id' ? 8 : 'Others';
  };

  useEffect(() => {
    if (!authData.isAuthenticated) {
      dispatch(
        openNotification({ severity: 'error', message: 'Please login first to access that page!' }),
      );
      navigate('/');
    }
    if (
      bookingData['0'].length === 0 &&
      bookingData['1'].length === 0 &&
      bookingData['2'].length === 0
    ) {
      setLoading(true);
      fetchBookings(0);
      fetchBookings(1);
      fetchBookings(2);
      setLoading(false);
    }
  }, []);

  const fetchBookings = async (state) => {
    try {
      const query = `?status=${state}&page=0&limit=15`;
      const resp = await dispatch(getProfessionalBookings(query)).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        console.log('Professional bookings response:: ', respJson);
        dispatch(setBookings({ id: state, data: respJson }));
      }
    } catch (error) {
      console.log('Error: fetch professional bookings::', error);
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
          {bookingData[activeState].length === 0 && (
            <Typography>
              No{' '}
              {activeState === 0 ? 'Inprogress ' : activeState === 1 ? 'Completed ' : 'Cancelled '}
              Bookings found
            </Typography>
          )}
          {!loading && bookingData[activeState].length !== 0 && (
            <>
              {bookingData[activeState].map((booking, index) => (
                <div key={index} className='bookingCardDiv' onClick={() => openBooking(booking)}>
                  {/* <div className='bookingImgDiv'>{booking.userFirstName.substring(0, 1)}</div> */}
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
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessionalBookings;
