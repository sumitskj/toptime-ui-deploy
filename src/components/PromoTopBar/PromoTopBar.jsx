import { Typography } from '@mui/material';
import './PromoTopBar.css';
// import { useNavigate } from 'react-router-dom';

const PromoTopBar = () => {
  // const navigate = useNavigate();

  // const handleUpcomingFeatures = () => {
  //   navigate('/upcoming_features');
  // };

  return (
    <>
      <div className='promoTopBarDiv'>
        <Typography
          sx={{
            color: 'white',
            m: '1rem',
            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '1rem' },
          }}>
          {/* <span className='spanItem'>🎉 Exclusive Limited Offer! 🎉</span> : TopTime is
          <span className='spanItem'> FREE(No Commissions)</span> for the First 1000 experts who
          will register for Lifetime! */}
          <span className='spanItem'>We are launching soon !!!</span>
        </Typography>
        {/* <div style={{ width: '10px' }}></div>
        <button onClick={handleUpcomingFeatures} className='upcomingFeatureBtn'>
          {' '}
          See Upcoming features
        </button> */}
      </div>
    </>
  );
};

export default PromoTopBar;
