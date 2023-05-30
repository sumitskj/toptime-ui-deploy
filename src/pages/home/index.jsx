import React, { useEffect } from 'react';
import { Card, Grid, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { CustomisedHomeText } from './components';
import Trending from './Trending';
import HowItWorks from './HowItWorks';

import './home.css';
import CtImage from '../../static/images/home-image.svg';
import FAQs from './FAQs';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/feeds', { replace: true });
    }
  }, []);

  return (
    <Grid container>
      <Grid item container justifyContent='space-between' xs={12} sx={{ p: '0 8rem;' }}>
        <Link to='/' className='nav-item active'>
          Home
        </Link>
        <Link to='/' className='nav-item'>
          Vloggers
        </Link>
        <Link to='/' className='nav-item'>
          Engineers
        </Link>
        <Link to='/' className='nav-item'>
          Engineers
        </Link>
        <Link to='/' className='nav-item'>
          Engineers
        </Link>
        <Link to='/' className='nav-item'>
          Engineers
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ p: '4rem 4rem' }}>
          <Grid item xs={12}>
            <Grid container justifyContent='space-evenly'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <CustomisedHomeText variant='h2'>
                  Connect, Learn and Grow: Unlock Expertise, One Minute at a Time
                </CustomisedHomeText>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Card sx={{ width: '100%', height: '100%', boxShadow: 'none' }}>
                  <CardMedia image={CtImage} title='content creator' sx={{ height: 500 }} />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* TODO Trending  api */}
          <Trending />
          <HowItWorks />
          <FAQs />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Home;
