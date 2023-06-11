import { Typography } from '@mui/material';
import './bookings.css';
import { useEffect, useState } from 'react';
import { setBookings } from './slice/bookings';
import { getProfessionalBookings } from './api/bookings';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { useNavigate } from 'react-router-dom';

const ProfessionalBookings = () => {
  const [activeState, setActiveState] = useState(() => 0);
  const [loading, setLoading] = useState(() => false);
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.professionalBookings);
  const navigate = useNavigate();

  const changeTab = (index) => {
    setActiveState(index);
  };

  const openBooking = (booking) => {
    navigate('/professional/booking/' + booking.bookingId, { state: { booking: booking } });
  };

  useEffect(() => {
    setLoading(true);
    fetchBookings(0);
    fetchBookings(1);
    fetchBookings(2);
    setLoading(false);
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
        {/* <div>
          <Typography sx={{ fontSize: '1.6rem', fontWeight: '500' }}>Bookings</Typography>
        </div> */}
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
                  <div className='bookingImgDiv'>{booking.userFirstName.substring(0, 1)}</div>
                  <div>
                    <Typography>{booking.duration}</Typography>
                    <Typography>{booking.finalBookingTime}</Typography>
                  </div>
                  <div>
                    <Typography>
                      {booking.userFirstName} {booking.userLastName}
                    </Typography>
                    <Typography>
                      {booking.userFirstName} {booking.userLastName}
                    </Typography>
                    <Typography>
                      {booking.userFirstName} {booking.userLastName}
                    </Typography>
                    <Typography>
                      {booking.userFirstName} {booking.userLastName}
                    </Typography>
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
