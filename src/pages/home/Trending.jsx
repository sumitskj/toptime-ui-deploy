import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { times, find } from 'lodash';

import UserFeedCard from '../user/feeds/UserFeedCard';
import { CustomisedCardLabels, StyledBoxScrollable } from './components';
import ProfessionalCardSkeleton from '../../components/skeleton/ProfessionalCardSkeleton';
import { openNotification } from '../notifications/slice/notification';
import { getFeedsTrending } from './api/home';
import { setTrendingFeeds } from './slice/home';

const Trending = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const categories = useSelector((state) => state.categories);
  const homeData = useSelector((state) => state.home);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const resp = await dispatch(getFeedsTrending()).unwrap();
      setLoading(false);
      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setTrendingFeeds(resJson));
      }
    } catch (error) {
      console.log('Error: Trending feeds:: ', error);
      setLoading(false);
      dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
    }
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

  if (homeData.trending.length > 0) {
    return (
      <Grid item xs={12}>
        <CustomisedCardLabels variant='h4'>Trending Experts</CustomisedCardLabels>
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
    );
  }

  if (loading) {
    return (
      <Grid item xs={12}>
        <CustomisedCardLabels variant='h4'>Trending Experts</CustomisedCardLabels>
        {times(4).map((v) => (
          <ProfessionalCardSkeleton key={v} />
        ))}
      </Grid>
    );
  }
};

export default Trending;
