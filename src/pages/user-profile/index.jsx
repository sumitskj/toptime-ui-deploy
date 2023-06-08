import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

import './user-profile.css';
import UserRateCard from './UserRateCard';

import { getProfessionalProfile } from './api/userProfile';
import { setProfessionalProfile } from './slice/userProfile';

const ChipStyledProfile = styled(Chip)`
  font-weight: 600;
  border: none;
  padding: 0 8px;
  .MuiChip-icon {
    color: #00adff;
  }
`;

const IconButtonStyled = styled(IconButton)`
  &:hover {
    background: #00adff;
    .MuiSvgIcon-root {
      color: #444;
    }
  }
  .MuiSvgIcon-root {
    color: #00adff;
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const userData = useSelector((state) => state.professionals.profile);

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
              <Typography variant='body1' component='div' gutterBottom>
                {userData.description}
              </Typography>
              <Box p={1}>
                {userData.instagramUrl && (
                  <IconButtonStyled size='large'>
                    <InstagramIcon />
                  </IconButtonStyled>
                )}
                {userData.linkedInUrl && (
                  <IconButtonStyled size='large'>
                    <LinkedInIcon />
                  </IconButtonStyled>
                )}
                {userData.youTubeUrl && (
                  <IconButtonStyled size='large'>
                    <YouTubeIcon />
                  </IconButtonStyled>
                )}
                {userData.githubUrl && (
                  <IconButtonStyled size='large'>
                    <GitHubIcon />
                  </IconButtonStyled>
                )}
                {userData.otherUrl && (
                  <IconButtonStyled size='large'>
                    <LinkIcon />
                  </IconButtonStyled>
                )}
              </Box>
            </CardContent>
          </Card>
          <Divider variant='middle' />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
            <UserRateCard userData={userData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
