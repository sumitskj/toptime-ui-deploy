import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { LogoWithName } from '../../logo/Logo';

const Header = () => {
  return (
    <Box width='100%' sx={{ padding: 1 }}>
      <Link to='/'>
        <LogoWithName />
      </Link>
    </Box>
  );
};

export { Header };
