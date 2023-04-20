import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomizedTextBox = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
`;

const MuiTextbox = (props) => {
  return <CustomizedTextBox variant='outlined' {...props} />;
};

MuiTextbox.propTypes = {};

export default MuiTextbox;
