import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserRateCard from './UserRateCard';

const RateStyled = styled(Typography)`
  font-weight: 200;
  span.value {
    float: right;
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 2.2rem;
  }
`;

const UserRateInfo = ({ userData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={6} sx={{ width: '100%', background: '#b8e4ff' }}>
          <Box p={2}>
            <RateStyled variant='h5' gutterBottom>
              Voice Call Rate <span className='value'>&#x20B9; {`${userData.voiceRate}/Min`}</span>
            </RateStyled>
            <RateStyled variant='h5' gutterBottom>
              Video Call Rate<span className='value'>&#x20B9; {`${userData.videoRate}/Min`}</span>
            </RateStyled>
            <Box sx={{ textAlign: 'center' }}>
              <Button variant='contained' sx={{ margin: '8px' }} onClick={handleClickOpen}>
                Book call
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: 0, minWidth: 600 }}>
          <UserRateCard userData={userData} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

UserRateInfo.propTypes = {
  userData: PropTypes.objectOf({
    voiceRate: PropTypes.number,
    videoRate: PropTypes.number,
  }).isRequired,
};

export default UserRateInfo;
