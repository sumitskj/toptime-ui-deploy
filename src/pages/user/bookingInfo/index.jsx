import { useLocation } from 'react-router-dom';

const BookingInfo = () => {
  const location = useLocation();
  const booking = location.state.booking;
  console.log(JSON.stringify(location));
  return <>{JSON.stringify(booking)}</>;
};

export default BookingInfo;
