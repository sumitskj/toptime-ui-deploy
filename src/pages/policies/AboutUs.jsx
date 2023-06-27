import styled from '@emotion/styled';
import { LogoWithName } from '../../components/logo/Logo';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CallIcon from '@mui/icons-material/Call';
import FeedbackIcon from '@mui/icons-material/Feedback';

const AboutUs = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };

  const TextStyled = styled(Typography)`
    text-align: justify;
    position: relative;
    width: 90%;
  `;

  return (
    <>
      <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
        <Toolbar disableGutters>
          <div style={{ marginLeft: '1rem', cursor: 'pointer' }} onClick={handleNavigateHome}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={10} sx={{ backgroundColor: '#F8DEF5' }} justifyContent={'center'}>
        <Grid item xs={11} md={5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'relative',
              width: '100%',
              height: { xs: '50vh', md: '100vh' },
            }}>
            <Typography
              sx={{ fontSize: { xs: '3rem', md: '4rem' }, fontWeight: '600', textAlign: 'center' }}>
              Connecting Experts and Seekers
            </Typography>
          </Box>
          <TextStyled></TextStyled>
        </Grid>
        <Grid item xs={11} md={5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'relative',
              width: '100%',
              height: { xs: '50vh', md: '100vh' },
              backgroundColor: '#F8DEF5',
              mb: '2rem',
            }}>
            <Typography
              sx={{
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontWeight: '300',
                textAlign: 'center',
              }}>
              At TopTime, we believe that knowledge and expertise should be easily accessible to
              everyone. We have created a platform that connects experts from various fields with
              individuals seeking personalized guidance and advice. Our marketplace allows users to
              book 1-1 calls with experts, enabling them to resolve their doubts, gain insights, and
              learn from experienced professionals.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'} backgroundColor={'#F19A6F'}>
        <Grid item xs={10} m={5}>
          <TextStyled sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: '500' }}>
            Our Mission
          </TextStyled>
          <TextStyled sx={{ mt: '1rem' }}>
            Our mission is to empower individuals by providing them with direct access to experts
            who can help them overcome challenges, gain knowledge, and achieve their goals. We
            strive to bridge the gap between expertise and those seeking it, facilitating meaningful
            connections and empowering personal and professional growth.
          </TextStyled>
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>How It Works</Typography>

        <Timeline position='alternate'>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color='primary' variant='outlined'>
                <AppRegistrationIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant='h6' component='span'>
                Experts register their skills
              </Typography>
              <Typography>
                People who wants to monetize their skill come on platform and register their profile
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color='primary' variant='outlined'>
                <TravelExploreIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant='h6' component='span'>
                Browse Experts
              </Typography>
              <Typography>
                Explore our diverse range of experts from various fields, including business,
                technology, personal development, arts, wellness, and more.
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color='primary' variant='outlined'>
                <ShoppingCartIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant='h6' component='span'>
                Book a Session
              </Typography>
              <Typography>
                Once you find an expert who matches your requirements, simply book a session based
                on your preferred date and time. Sessions can be scheduled for a specific duration,
                allowing you to receive personalized guidance and support.
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color='primary' variant='outlined'>
                <CallIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant='h6' component='span'>
                Connect and Learn
              </Typography>
              <Typography>
                During the scheduled session, you&apos;ll have the opportunity to engage in a
                private 1-1 call with your chosen expert. Utilize this time to discuss your
                challenges, ask questions, and receive expert advice tailored to your needs.
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color='primary' variant='outlined'>
                <FeedbackIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant='h6' component='span'>
                Review and Feedback
              </Typography>
              <Typography>
                After each session, both experts and users have the opportunity to provide feedback
                and ratings. This feedback system helps maintain the quality of our platform and
                assists others in finding the right expert for their needs.
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </>
  );
};

export default AboutUs;
