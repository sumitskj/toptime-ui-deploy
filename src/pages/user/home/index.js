import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Categories from '../../home/Categories';
import Trending from '../../home/Trending';
import HowItWorks from '../../home/HowItWorks';
import FAQs from '../../home/FAQs';
import Footer from '../../home/Footer';
import Recommendation from './Recommendation';

const UserHome = () => {
  const navigate = useNavigate();

  const handleRegisterProfessional = () => {
    navigate('/register-professional');
  };

  return (
    <Box
      sx={{
        marginTop: '2rem',
      }}>
      <Box
        sx={{
          marginLeft: { xs: '2rem', md: '4rem' },
          marginRight: { xs: '2rem', md: '4rem' },
          mb: '3rem',
        }}>
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              sx={{
                fontSize: { xs: '2.4rem', sm: '3rem', md: '3rem', lg: '4rem' },
                fontWeight: '600',
              }}>
              Monetize your experiences today
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                fontWeight: '400',
                m: '2rem 0',
              }}>
              Connect, Learn and Grow: Unlock Expertise, One Minute at a Time
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                m: '5rem 0rem',
              }}>
              <Button
                onClick={handleRegisterProfessional}
                variant='filled'
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: '400',
                  fontSize: { xs: '1rem', md: '1.5rem' },
                  ':hover': { transform: 'scale(1.02)', backgroundColor: 'black' },
                }}>
                Become Expert
              </Button>
              <Button
                onClick={() =>
                  window.scrollTo({
                    top: document.getElementById('explore').offsetTop,
                  })
                }
                variant='outlined'
                sx={{
                  border: '2px solid black',
                  color: 'black',
                  textTransform: 'none',
                  fontWeight: '500',
                  fontSize: { xs: '1rem', md: '1.5rem' },
                  ':hover': {
                    transform: 'scale(1.02)',
                    backgroundColor: 'white',
                    border: '2px solid black',
                  },
                }}>
                {'Explore →'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Card sx={{ width: '100%', height: '100%', boxShadow: 'none' }}>
              <CardMedia
                image='/home-image-new.svg'
                title='content creator'
                sx={{
                  height: { md: '450px', xs: '300px' },
                  backgroundSize: 'contain',
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Categories />
      <Recommendation />
      <Trending />
      <HowItWorks />
      <FAQs />
      <Footer />
    </Box>
  );
};

export default UserHome;
