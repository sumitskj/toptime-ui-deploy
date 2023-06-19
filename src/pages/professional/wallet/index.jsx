import { useEffect, useState } from 'react';
import './profWallet.css';
import { fetchPaymentApiWrapper } from '../../../utils';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ProfessionalWallet = () => {
  const authData = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(() => null);
  const [balanceLoading, setBalanceLoading] = useState(() => false);
  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setBalanceLoading(true);
    const balRes = await getProfessionalBalance();
    if (balRes.ok) {
      const balJson = await balRes.json();
      console.log('User Balance : ', balJson);
      setBalance(balJson);
    }
    setBalanceLoading(false);
  };

  const getProfessionalBalance = async () => {
    const response = await fetchPaymentApiWrapper(
      '/api/v1/payment/wallet/professional/balance',
      {
        method: 'GET',
      },
      authData.authData.accessToken,
    );
    return response;
  };

  return (
    <>
      <div className='profParentDiv'>
        <div className='balanceCardsDiv'>
          <div style={{ backgroundColor: '#eaf3fd' }} className='profBalanceDiv'>
            <div className='profBalanceImgDiv'></div>
            <div style={{ fontWeight: '300', fontSize: '1rem', color: 'grey' }}>Balance</div>
            <div style={{ fontWeight: '600', fontSize: '2rem' }}>
              {balanceLoading || balance === null ? '-' : '₹' + balance.balance}
            </div>
          </div>
          <div style={{ width: '2rem' }}></div>
          <div style={{ backgroundColor: '#F3DEDC' }} className='profBalanceDiv'>
            <div className='profBalanceHoldImgDiv'></div>
            <div
              style={{ fontWeight: '300', fontSize: '1rem', color: 'grey', textAlign: 'center' }}>
              Balance At Hold
            </div>
            <div style={{ fontWeight: '600', fontSize: '2rem' }}>
              {balanceLoading || balance === null ? '-' : '₹' + balance.balanceAtHold}
            </div>
          </div>
        </div>
        <div>
          <IconButton onClick={fetchBalance}>
            <RefreshIcon />
          </IconButton>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}>
          <div
            style={{
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: '600',
              margin: '1rem',
              border: '1px solid black',
            }}>
            Transactions
          </div>
          <div
            style={{
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '600',
              margin: '1rem',
              border: '1px solid black',
            }}>
            Withdrawals
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalWallet;
