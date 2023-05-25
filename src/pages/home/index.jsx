import React, { useEffect } from 'react';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './home.css';
import CtImage from '../../static/images/ct-creator.jpg';

const CustomisedHomeText = styled(Typography)`
  font-weight: 700;
  padding: 2rem 4rem 2rem 0rem;
`;

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
          <Grid item xs={8}>
            <CustomisedHomeText variant='h1'>
              Connect with the person you need in minutes
            </CustomisedHomeText>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardMedia image={CtImage} title='content creator' sx={{ height: '100%' }} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
