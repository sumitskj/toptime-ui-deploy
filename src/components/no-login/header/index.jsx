import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box width='100%' height='2rem' sx={{ padding: 2 }}>
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
        Top Time
      </Typography>
    </Box>
  );
};

export { Header };
