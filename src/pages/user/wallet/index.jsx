import { useEffect, useState } from 'react';
import './userWallet.css';
import { IconButton } from '@mui/material';
import { fetchPaymentApiWrapper } from '../../../utils';
import { useSelector } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';

const UserWallet = () => {
  const authData = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(() => null);
  const [balanceLoading, setBalanceLoading] = useState(() => false);
  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setBalanceLoading(true);
    const balRes = await getUserBalance();
    if (balRes.ok) {
      const balJson = await balRes.json();
      console.log('User Balance : ', balJson);
      setBalance(balJson.balance);
    }
    setBalanceLoading(false);
  };

  const getUserBalance = async () => {
    const response = await fetchPaymentApiWrapper(
      '/api/v1/payment/wallet/user/balance',
      {
        method: 'GET',
      },
      authData.authData.accessToken,
    );
    return response;
  };

  return (
    <>
      <div className='parentDiv'>
        <div className='balanceDiv'>
          <div className='leftDiv'>
            <div className='moneyImgDiv'></div>
            <div style={{ fontWeight: '300', fontSize: '1rem', color: 'grey' }}>Balance</div>
            <div style={{ fontWeight: '600', fontSize: '2rem' }}>
              {balanceLoading ? '-' : '₹' + balance}
            </div>
          </div>
          <div className='rightDiv'>
            <IconButton onClick={fetchBalance}>
              <RefreshIcon />
            </IconButton>
            <button
              style={{
                padding: '12px',
                border: '0',
                borderRadius: '12px',
                backgroundColor: 'black',
                color: 'white',
                fontWeight: '700',
              }}>
              + Add Money
            </button>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default UserWallet;
