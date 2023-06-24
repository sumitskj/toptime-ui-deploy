import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

import UserRateCard from './UserRateCard';
import { useSelector } from 'react-redux';

const UserRateInfo = ({ userData }) => {
  const [openBookDialog, setOpenBookDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const authData = useSelector((state) => state.auth);

  const handleClickOpen = () => {
    if (!authData.isAuthenticated) {
      setOpenLoginDialog(true);
    } else {
      setOpenBookDialog(true);
    }
  };

  const handleClose = () => {
    setOpenBookDialog(false);
  };

  const handleLogin = () => {
    setOpenLoginDialog(false);
    window.open(`${window.location.origin}/login`, '_blank');
  };

  const LoginDialog = () => {
    return (
      <Dialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)}>
        <DialogTitle sx={{ fontFamily: 'Rubik' }}>Please Login</DialogTitle>
        <DialogContent>
          Please first login and then comeback here again to book the call
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleLogin}
            style={{
              cursor: 'pointer',
              border: '0',
              borderRadius: '12px',
              backgroundColor: 'black',
              color: 'white',
              fontFamily: 'Rubik',
              padding: '12px',
              fontSize: '1rem',
            }}>
            Login
          </button>
          <button
            onClick={() => setOpenLoginDialog(false)}
            style={{
              cursor: 'pointer',
              border: '0',
              borderRadius: '12px',
              backgroundColor: 'white',
              color: 'red',
              fontFamily: 'Rubik',
              padding: '12px',
              fontSize: '1rem',
            }}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={6} sx={{ width: '100%', background: '#E5FDD1', borderRadius: '12px' }}>
          <Box p={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
              }}>
              <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Rubik' }}>
                Voice Call Rate
              </Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', fontFamily: 'Rubik' }}>
                &#x20B9;{userData.voiceRate}/Min
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
              }}>
              <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Rubik' }}>
                Video Call Rate
              </Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', fontFamily: 'Rubik' }}>
                &#x20B9;{userData.videoRate}/Min
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                sx={{
                  mt: '1rem',
                  fontSize: '1.2rem',
                  borderRadius: '0',
                  backgroundColor: '#009EF7',
                  fontFamily: 'Rubik',
                }}
                onClick={handleClickOpen}>
                Book call
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Dialog open={openBookDialog} onClose={handleClose}>
        <DialogContent sx={{ padding: 0, minWidth: 600 }}>
          <UserRateCard userData={userData} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <LoginDialog />
    </Grid>
  );
};

UserRateInfo.propTypes = {
  userData: PropTypes.shape({
    voiceRate: PropTypes.number,
    videoRate: PropTypes.number,
  }).isRequired,
};

export default UserRateInfo;
