import React from 'react';
import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';

import './user-profile.css';
import UserRateCard from './UserRateCard';

// TODO: remove
import Pimage from '../../static/images/ct-creator.jpg';

const UserProfile = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box pt={4} pb={4}>
          <Card sx={{ maxWidth: '50%', margin: '0 auto', boxShadow: 'none', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                component='img'
                alt='profile image'
                image={Pimage}
                sx={{ width: '200px', height: '200px', borderRadius: '50%' }}
              />
            </Box>

            <CardContent>
              <Typography variant='h6' component='div'>
                Mark Zuke Modi
              </Typography>
              <Typography gutterBottom variant='overline' sx={{ lineHeight: '3rem' }}>
                Civil Engineer | Photographer
              </Typography>
              <span className='ratings'>
                <Chip
                  icon={<StarIcon sx={{ fontSize: 20 }} />}
                  label='4.73'
                  className='rating-val'
                />
                <Chip
                  icon={<ReviewsIcon sx={{ fontSize: 20 }} />}
                  label='15 reviews'
                  className='rating-val'
                />
              </span>
            </CardContent>
          </Card>
          <Divider variant='middle' />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
            TODO:: Left content
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
            <UserRateCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
