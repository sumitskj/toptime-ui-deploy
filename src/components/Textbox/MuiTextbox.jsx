import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CustomizedTextBox = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
`;

const MuiTextbox = (props) => {
  const { value, onChange, ...rest } = props;
  return <CustomizedTextBox variant='outlined' value={value} onChange={onChange} {...rest} />;
};

MuiTextbox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

MuiTextbox.defaultProps = {
  value: '',
  onChange: () => {},
};

export default MuiTextbox;
