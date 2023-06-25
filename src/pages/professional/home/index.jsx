import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import FAQs from '../../home/FAQs';
import Footer from '../../home/Footer';
import ProfessionalUpcomingBooking from './ProfessionalUpcomingBooking';
import HowItWorks from './HowItWorks';
import SummaryCard from './SummaryCard';

const ProfessionalHome = () => {
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
      <ProfessionalUpcomingBooking />
      <SummaryCard />
      <HowItWorks />
      <FAQs isProfessional={true} />
      <Footer />
    </Box>
  );
};

export default ProfessionalHome;
