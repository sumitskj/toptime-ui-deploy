import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { times, find } from 'lodash';

import UserFeedCard from './UserFeedCard';
import { CustomisedCardLabels } from '../../home/components';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { openNotification } from '../../notifications/slice/notification';
import { getFeedsRecommended } from '../../home/api/home';
import { setRecommendedFeeds } from '../../home/slice/home';
import styled from '@emotion/styled';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Recommendation = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categories = useSelector((state) => state.categories);
  const homeData = useSelector((state) => state.home);
  const authData = useSelector((state) => state.auth);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const resp = await dispatch(
        getFeedsRecommended({ token: authData.authData.accessToken }),
      ).unwrap();

      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setRecommendedFeeds(resJson));
      }
    } catch (err) {
      setError(true);
      console.log('Error: Fetching Trending feeds:: ', err);
      dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
    }
    setLoading(false);
  };

  const findCategory = (query, returnKey = 'id') => {
    const findItem = find(categories, { ...query });
    if (findItem) {
      return findItem[returnKey];
    }
    // default category
    return returnKey === 'id' ? 8 : 'Others';
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const StyledBoxScrollable = styled(Box)`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    --webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
      width: none;
      height: 0;
      -ms-overflow-style: none;
    }
  `;

  return (
    <Box
      sx={{
        pl: { xs: '0rem', md: '4rem' },
        pr: { xs: '0rem', md: '4rem' },
        pt: '2rem',
        mt: '1rem',
        backgroundColor: '#f8f7f1',
      }}>
      {!error && !loading && homeData.recommended.length > 0 && (
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                fontWeight: '600',
                m: { xs: '12px', md: '16px' },
              }}>
              Recommendations For You
            </Typography>
            <ThumbUpOffAltIcon style={{ fontSize: '32px' }} />
          </div>

          <StyledBoxScrollable sx={{ justifyContent: 'flex-start' }}>
            {homeData.recommended.map((u) => (
              <UserFeedCard
                key={u.professionalId}
                data={u}
                navKey='professionalId'
                category={findCategory({ id: u.category }, 'label')}
              />
            ))}
          </StyledBoxScrollable>
        </Grid>
      )}
      {loading && (
        <Grid item xs={12}>
          <CustomisedCardLabels variant='h4'>Recommended Experts For you</CustomisedCardLabels>
          {times(4).map((v) => (
            <ProfessionalCardSkeleton key={v} />
          ))}
        </Grid>
      )}
      {error && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
          }}>
          Something went wrong. Please try again or check your internet connection.
        </Box>
      )}
    </Box>
  );
};

export default Recommendation;
