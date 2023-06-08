import React from 'react';
import { Grid } from '@mui/material';
import { CustomisedCardLabels } from './components';
import ProfessionalCardSkeleton from '../../components/skeleton/ProfessionalCardSkeleton';
import { times } from 'lodash';

const Trending = () => {
  return (
    <Grid item xs={12}>
      <CustomisedCardLabels variant='h4'>Trending Experts</CustomisedCardLabels>
      {times(5).map((v) => (
        <ProfessionalCardSkeleton key={v} />
      ))}
    </Grid>
  );
};

export default Trending;
