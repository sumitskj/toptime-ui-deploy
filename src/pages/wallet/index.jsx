import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const CustomisedMoney = styled(Typography)`
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 2rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const WalletValueCard = styled(Card)`
  background: #c9f2ff;
  display: inline-block;
  text-align: center;
  width: 450px;
`;

const Wallet = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginBottom: '1em', textAlign: 'center' }}>
        <WalletValueCard variant='outlined'>
          <CardContent>
            <Typography variant='h5' component='div' gutterBottom>
              Available Balance
            </Typography>
            <CustomisedMoney component='span'>
              <CurrencyRupeeIcon /> 0.0
            </CustomisedMoney>
            <Button variant='contained' startIcon={<AddIcon />}>
              Add Money
            </Button>
          </CardContent>
        </WalletValueCard>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: '1em', textAlign: 'center' }}>
        <Button variant='contained'>See Transactions</Button>
      </Grid>
    </Grid>
  );
};

export default Wallet;
