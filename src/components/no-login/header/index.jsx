import React from 'react';
import { Box } from '@mui/material';
import Logo from '../../logo/Logo';

const Header = () => {
  return (
    <Box width='100%' sx={{ padding: 1 }}>
      <Logo />
    </Box>
  );
};

export { Header };
