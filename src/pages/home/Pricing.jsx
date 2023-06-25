import { Box, Button, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useLocation, useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBecomeExpert = () => {
    if (location.pathname.includes('user')) {
      navigate('/register-professional');
    } else {
      navigate('/login');
    }
  };
  return (
    <div id='pricingSection'>
      <Box
        sx={{
          pt: '2rem',
          backgroundColor: '#e2eeda',
          pb: '4rem',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
          }}>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
              m: { xs: '12px', md: '16px' },
              fontWeight: '600',
            }}>
            Pricing
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative',
            width: '80%',
          }}>
          <Typography sx={{ fontSize: '5rem', fontWeight: '700' }}>
            <CurrencyRupeeIcon sx={{ fontSize: '4rem' }} />0
          </Typography>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: '300',
              textAlign: { xs: 'justify', md: 'center' },
            }}>
            If you registered as an expert, then for a booking you are keeping all the amount. There
            are <span style={{ fontWeight: '800' }}>No commissions</span> from our end. You keep
            100% of your earnings minus the transaction charges
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: '200',
              mt: '1rem',
              textAlign: { xs: 'justify', md: 'center' },
            }}>
            But we don&apos;t know for how much period it is free. So register early
          </Typography>
          <Button
            variant='outlined'
            sx={{
              display: {
                sm: 'block',
                xs: 'none',
              },
              fontWeight: '600',
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid black',
              marginRight: { xs: '2rem', md: '4rem' },
              mt: '1rem',
              ':hover': {
                transform: 'scale(1.02)',
                backgroundColor: 'black',
                border: '2px solid black',
              },
            }}
            onClick={handleBecomeExpert}>
            REGISTER AS EXPERT NOW
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Pricing;
