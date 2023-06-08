import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';

const ProfessionalCardSkeleton = ({ width }) => {
  return (
    <Box sx={{ width: width, margin: '2rem', my: 5, display: 'inline-block' }}>
      <Skeleton variant='rectangular' width='100%' height={250} sx={{ borderRadius: '1rem' }} />
      <Box sx={{ pt: 1 }}>
        <Skeleton />
        <Skeleton width='60%' />
      </Box>
    </Box>
  );
};

ProfessionalCardSkeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProfessionalCardSkeleton.defaultProps = {
  width: 350,
};

export default ProfessionalCardSkeleton;
