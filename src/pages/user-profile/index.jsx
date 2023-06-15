import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';

import './user-profile.css';

import { getProfessionalProfile } from './api/userProfile';
import { setProfessionalProfile } from './slice/userProfile';
import UserSocialLinks from './UserSocialLinks';
import UserRateInfo from './UserRateInfo';

const ChipStyledProfile = styled(Chip)`
  font-weight: 600;
  border: none;
  padding: 0 8px;
  .MuiChip-icon {
    color: #00adff;
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const userData = useSelector((state) => state.professionals.profile);

  const [showMore, setShowMore] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const query = `?id=${id}`;
      const resp = await dispatch(getProfessionalProfile(query)).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        dispatch(setProfessionalProfile(respJson));
      }
    } catch (error) {
      console.log('Error in UserDetails:: ', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    return () => {
      dispatch(setProfessionalProfile({}));
    };
  }, [id]);

  const desc = get(userData, 'description', '');

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box pt={4} pb={4}>
          <Card sx={{ maxWidth: '50%', margin: '0 auto', boxShadow: 'none', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                component='img'
                alt='profile image'
                image={userData.profilePicUrl}
                sx={{ width: '200px', height: '200px', borderRadius: '50%' }}
              />
            </Box>

            <CardContent>
              <Typography variant='h6' component='div'>
                {`${userData.firstName} ${userData.lastName}`}
              </Typography>
              <Typography gutterBottom variant='overline' sx={{ lineHeight: '3rem' }}>
                {`${userData.designation} at ${userData.company}`}
              </Typography>
              <span className='ratings'>
                <ChipStyledProfile
                  icon={<StarIcon sx={{ fontSize: 20 }} />}
                  label={userData.rating}
                  className='rating-val'
                />
                <ChipStyledProfile
                  icon={<ReviewsIcon sx={{ fontSize: 20 }} />}
                  label={`${userData.sessionsCompleted} session completed`}
                  className='rating-val'
                />
              </span>
              <UserSocialLinks userData={userData} />
              <Typography variant='body1' component='div' gutterBottom>
                {showMore ? desc : `${desc.substring(0, 80)}....`}
                <Button variant='text' onClick={() => setShowMore(!showMore)}>
                  {showMore ? 'Show less' : 'Show more'}
                </Button>
              </Typography>
            </CardContent>
          </Card>
          <Divider variant='middle' />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
            {userData.voiceRate && userData.videoRate && <UserRateInfo userData={userData} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
