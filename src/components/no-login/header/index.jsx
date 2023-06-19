import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Logo from '../../logo/Logo';

const Header = () => {
  return (
    <Box width='100%' sx={{ padding: 1 }}>
      <Link to='/'>
        <Logo />
      </Link>
    </Box>
  );
};

export { Header };
