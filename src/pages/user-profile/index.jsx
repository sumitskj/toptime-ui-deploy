import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import './user-profile.css';
import UserRateCard from './UserRateCard';

import { getUserDetails } from './api/userProfile';
import { setUserDetails } from './slice/userProfile';

// TODO: remove
import Pimage from '../../static/images/ct-creator.jpg';

const UserProfile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userProfile);

  const fetchUserDetails = async () => {
    try {
      const resp = await dispatch(getUserDetails()).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        dispatch(setUserDetails(respJson));
      }
    } catch (error) {
      console.log('Error in UserDetails:: ', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

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
                {`${userData.firstName} ${userData.lastName}`}
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
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userData.emailId} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PhoneIphoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userData.mobileNumber} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CategoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userData.preferredCategory} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccessTimeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userData.timeZone} />
              </ListItem>
            </List>
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
