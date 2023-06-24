import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { times, find } from 'lodash';

import UserFeedCard from './UserFeedCard';
import { CustomisedCardLabels } from './components';
import ProfessionalCardSkeleton from '../../components/skeleton/ProfessionalCardSkeleton';
import { openNotification } from '../notifications/slice/notification';
import { getFeedsTrending } from './api/home';
import { setTrendingFeeds } from './slice/home';
import styled from '@emotion/styled';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Trending = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categories = useSelector((state) => state.categories);
  const homeData = useSelector((state) => state.home);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const resp = await dispatch(getFeedsTrending()).unwrap();

      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setTrendingFeeds(resJson));
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
    fetchTrending();
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
        mt: '0rem',
        backgroundColor: '#f8f7f1',
      }}>
      {!error && !loading && homeData.trending.length > 0 && (
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                fontWeight: '600',
                m: { xs: '12px', md: '16px' },
              }}>
              Trending Experts
            </Typography>
            <TrendingUpIcon style={{ fontSize: '32px' }} />
          </div>

          <StyledBoxScrollable sx={{ justifyContent: 'flex-start' }}>
            {homeData.trending.map((u) => (
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
          <CustomisedCardLabels variant='h4'>Trending Experts</CustomisedCardLabels>
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

export default Trending;
