import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { get, find } from 'lodash';
import {
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';

import './user-profile.css';

import { getProfessionalProfile } from './api/userProfile';
import UserRateInfo from './UserRateInfo';
import UserSocialLinks from './UserSocialLinks';
import { LogoWithName } from '../../components/logo/Logo';

const ChipStyledProfile = styled(Chip)`
  font-weight: 600;
  border: none;
  padding: 0 8px;
  background-color: white;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DataStyledProfile = styled(Typography)`
  font-weight: 600;
  font-size: 1rem;
  font-family: Rubik;
  span {
    font-weight: 400;
    margin-left: 1rem;
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const categoriesData = useSelector((state) => state.categories);

  const [showMore, setShowMore] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const profId = id.substring(id.lastIndexOf('-') + 1);
      const query = `?id=${profId}`;
      const resp = await dispatch(getProfessionalProfile(query)).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        setUserData(respJson);
      }
    } catch (err) {
      setError(true);
      console.log('Error in fetching UserDetails:: ', err);
    }
    setLoading(false);
  };

  const findCategory = (query) => {
    const findItem = find(categoriesData, { ...query });
    console.log('**** ', findItem);
    if (findItem) {
      return findItem.label;
    }
    // default category
    return 'Others';
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const desc = get(userData, 'description', '');

  return (
    <>
      <AppBar position='relative' sx={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters>
          <div
            style={{ marginLeft: '1rem', cursor: 'pointer' }}
            onClick={() => navigate('/', { replace: 'true' })}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      {error && (
        <Grid
          container
          sx={{ height: '100vh' }}
          direction='row'
          justifyContent='center'
          alignItems='center'>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant='body1'>
              Something went wrong. Please try refreshing the page again.
            </Typography>
          </Grid>
        </Grid>
      )}
      {loading && !error && (
        <Grid
          container
          sx={{ height: '100vh' }}
          direction='row'
          justifyContent='center'
          alignItems='center'>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ color: 'black' }} />
          </Grid>
        </Grid>
      )}
      {!loading && !error && userData !== null && (
        <Grid container>
          <Grid container spacing={10} justifyContent={'center'}>
            <Grid item xs={11} sm={6}>
              <div className='profileImgDiv'>
                <img src={userData.profilePicUrl} alt='' />
                <UserSocialLinks userData={userData} />
              </div>
            </Grid>

            <Grid item xs={11} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  justifyContent: 'center',
                  marginTop: { xs: '0', sm: '2rem' },
                }}>
                <Typography
                  sx={{
                    fontFamily: 'Rubik',
                    fontSize: { xs: '1.2rem', md: '1.6rem' },
                    fontWeight: '600',
                  }}>
                  {`${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Rubik',
                    fontSize: { xs: '1rem', md: '1.3rem' },
                    fontWeight: '400',
                  }}>
                  {`${userData.designation} ${
                    userData.company === null || userData.company.length === 0
                      ? ''
                      : ' at ' + userData.company
                  }`}
                </Typography>
                <span className='ratings'>
                  <ChipStyledProfile
                    icon={<StarIcon color='#F7DE05' sx={{ fontSize: 20, color: '#F7DE05' }} />}
                    label={userData.rating + '/5 Rating'}
                    className='rating-val'
                  />
                  <ChipStyledProfile
                    icon={
                      <BookOnlineRoundedIcon
                        color='#F69B11'
                        sx={{ fontSize: 20, color: '#F69B11' }}
                      />
                    }
                    label={`${userData.sessionsCompleted} Bookings Completed`}
                    className='rating-val'
                  />
                </span>
                <DataStyledProfile mt={'2rem'}>
                  Category <span>{findCategory({ id: userData.category })}</span>
                </DataStyledProfile>
                <DataStyledProfile variant='h6' gutterBottom>
                  Years of experience <span>{userData.yearsExperience}</span>
                </DataStyledProfile>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ justifyContent: 'space-evenly', margin: '2rem 0rem' }}>
              <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
                {userData.voiceRate && userData.videoRate && <UserRateInfo userData={userData} />}
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          <Grid
            container
            justifyContent={'center'}
            sx={{ padding: '2rem', background: '#FFE0D8', minHeight: 200 }}>
            <Grid item xs={10} sm={3} md={2}>
              <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
                About Me
              </Typography>
            </Grid>
            <Grid item xs={10} sm={7} md={7}>
              <Box>
                <Typography
                  variant='body1'
                  component='div'
                  gutterBottom
                  sx={{ fontFamily: 'Rubik', textAlign: 'justify' }}>
                  {showMore ? desc : `${desc.length < 500 ? desc : desc.substring(0, 500) + '...'}`}
                  {desc.length > 500 && (
                    <Button variant='text' onClick={() => setShowMore(!showMore)}>
                      {showMore ? 'Show less' : 'Show more'}
                    </Button>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserProfile;
