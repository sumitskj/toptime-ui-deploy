import { Box, Card, CardMedia, Grid, ListItem, Typography } from '@mui/material';
import FAQs from '../../home/FAQs';
import Footer from '../../home/Footer';
import ProfessionalUpcomingBooking from './ProfessionalUpcomingBooking';
import HowItWorks from './HowItWorks';
import SummaryCard from './SummaryCard';
import PlayStoreImg from '../../../static/images/google-play-badge.png';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProfessionalHome = () => {
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
      <ProfessionalUpcomingBooking />
      <SummaryCard />
      <HowItWorks />
      <FAQs isProfessional={true} />
      <Footer />
    </Box>
  );
};

export default ProfessionalHome;
