import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import { CustomisedCardLabels } from './components';

const Trending = () => {
  return (
    <Grid item xs={12}>
      <CustomisedCardLabels variant='h4'>Trending Experts</CustomisedCardLabels>
      {[1, 2, 3, 4].map((v) => (
        <Box key={v} sx={{ width: 350, margin: '2rem', my: 5, display: 'inline-block' }}>
          <Skeleton variant='rectangular' width={350} height={250} sx={{ borderRadius: '1rem' }} />
          <Box sx={{ pt: 1 }}>
            <Skeleton />
            <Skeleton width='60%' />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default Trending;
