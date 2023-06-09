import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { getAllFeedsHome, getFeedsRecommended } from './api/feeds';
import { setFeedsAll, setRecommendedFeeds } from './slice/feeds';

import UserFeedCard from './UserFeedCard';

const ChipStyled = styled(Chip)`
  font-weight: 600;
  border: 1px solid #00adff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DividerStyled = styled(Divider)`
  &::before {
    width: 5%;
    border-top: 1px solid rgb(18 159 255);
  }
  &::after {
    border-top: 1px solid rgb(18 159 255);
  }
`;

const UserFeeds = () => {
  const dispatch = useDispatch();

  const feeds = useSelector((state) => state.feeds);

  const fetchAllFeeds = async () => {
    try {
      const resp = await dispatch(getAllFeedsHome()).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        dispatch(setFeedsAll(respJson));
      }
    } catch (error) {
      console.log('Error:: ', error);
    }
  };

  const fetchRecommendedFeeds = async () => {
    try {
      const resp = await dispatch(getFeedsRecommended()).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        dispatch(setRecommendedFeeds(respJson));
      }
    } catch (error) {
      console.log('Error:: ', error);
    }
  };

  useEffect(() => {
    fetchAllFeeds();
    fetchRecommendedFeeds();
  }, []);

  return (
    <Grid container>
      {feeds.recommended.length > 0 && (
        <Grid item xs={12}>
          <DividerStyled textAlign='left'>
            <ChipStyled label='Recommended for you' variant='outlined' />
          </DividerStyled>
          {feeds.recommended.map((f) => (
            <UserFeedCard data={f} key={f.professionalId} />
          ))}
        </Grid>
      )}
      {feeds.favourites.length > 0 && (
        <Grid item xs={12}>
          <DividerStyled textAlign='left'>
            <ChipStyled label='Favorites' variant='outlined' />
          </DividerStyled>
          {feeds.favourites.map((f) => (
            <UserFeedCard data={f} key={f.professionalId} />
          ))}
        </Grid>
      )}

      {feeds.trending.length > 0 && (
        <Grid item xs={12}>
          <DividerStyled textAlign='left'>
            <ChipStyled label='Trendings' variant='outlined' />
          </DividerStyled>
          {feeds.trending.map((f) => (
            <UserFeedCard data={f} key={f.professionalId} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default UserFeeds;
