import { Box, Button, Card, CardMedia, Grid, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Categories from '../../home/Categories';
import Trending from '../../home/Trending';
import HowItWorks from '../../home/HowItWorks';
import FAQs from '../../home/FAQs';
import Footer from '../../home/Footer';
import Recommendation from './Recommendation';
import UserUpcomingBooking from './UserUpcomingBooking';
import Pricing from '../../home/Pricing';
import PlayStoreImg from '../../../static/images/google-play-badge.png';
import FavoriteIcon from '@mui/icons-material/Favorite';

const UserHome = () => {
  const navigate = useNavigate();

  const handleRegisterProfessional = () => {
    navigate('/register-professional');
  };

  return (
    <Box
      sx={{
        marginTop: '0rem',
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
              <div>
                Interact with your favourite{' '}
                <FavoriteIcon
                  sx={{
                    verticalAlign: 'sub',
                    color: 'red',
                    fontSize: { xs: '2.4rem', sm: '3rem', md: '3rem', lg: '4rem' },
                  }}
                />
              </div>{' '}
              <div className='moving-heading-div'>
                <div className='moving-heading-item1'>Creator</div>
                <div className='moving-heading-item2'>Traveller</div>
                <div className='moving-heading-item3'>Mentor</div>
                <div className='moving-heading-item4'>Influencer</div>
              </div>{' '}
              Today!
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                fontWeight: '400',
                m: '2rem 0',
              }}>
              Connect, Learn and Earn: Unlock Expertise, One Minute at a Time
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
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                width: '100%',
              }}>
              <a
                href='https://play.google.com/store/apps/details?id=club.toptime.toptime_main&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                target='_blank'
                rel='noreferrer'>
                <img alt='Get it on Google Play' height={100} src={PlayStoreImg} />
              </a>
            </ListItem>
          </Grid>
        </Grid>
      </Box>
      <UserUpcomingBooking />
      <Categories />
      <Recommendation />
      <Trending />
      <HowItWorks />
      <Pricing />
      <FAQs isProfessional={false} />
      <Footer />
    </Box>
  );
};

export default UserHome;
