import styled from '@emotion/styled';
import { LogoWithName } from '../../components/logo/Logo';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CancellationAndRefund = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };

  const TextStyled = styled(Typography)`
    text-align: justify;
    position: relative;
    width: 90%;
  `;

  return (
    <>
      <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
        <Toolbar disableGutters>
          <div style={{ marginLeft: '1rem', cursor: 'pointer' }} onClick={handleNavigateHome}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          mt: '1rem',
        }}>
        <Typography sx={{ fontSize: '2.5rem', fontWeight: '600', textAlign: 'center' }}>
          Cancellation and Refund Policy
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Following are the terms cancellation and refund policy
        </TextStyled>
        <TextStyled>
          <br />
          - A booking can be cancelled at any time before the call has started or before any one of
          user or expert has joined the call.
          <br />- If the booking is cancelled by user before 1hr of its scheduled time, user will
          get 100% refund.
          <br />- If the booking is cancelled by user within 1hr of its scheduled time, user will
          get 50% refund and expert will get remaining 50%.
          <br />- If the booking is cancelled by expert, user will get 100% refund.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Account Wallet information
        </TextStyled>
        <TextStyled>
          <br />- Money from user wallet is not withdrawable. Once the wallet is recharged, you can
          then only use this money to book calls with experts.
          <br />- Money from professional wallet is withdrawable, and it takes around 3 working days
          to deposit the withdrawn amount to professionals bank account.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Complains Processing
        </TextStyled>
        <TextStyled>
          <br />- Users can raise complain regarding any booking within 12 hrs after the call with
          expert has ended.
          <br />- The complain will be addressed within 24hrs of its creation.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Information about professionals booking
        </TextStyled>
        <TextStyled>
          <br />
          - After a call with professional has ended, user has 12hrs to report any complain
          regarding call.
          <br />- After 12 hrs, if user do not raise any complain, booking amount will be credited
          to professional wallet
          <br />- After 12 hrs, if user raises any complain, booking amount will be credited or not
          credited to professional wallet after the complain is resolved.
          <br />
          <br />
        </TextStyled>
      </Box>
    </>
  );
};

export default CancellationAndRefund;
