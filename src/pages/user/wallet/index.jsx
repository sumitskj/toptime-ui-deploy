import { useEffect, useState } from 'react';
import './userWallet.css';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { fetchPaymentApiWrapper } from '../../../utils';
import { useSelector } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import moment from 'moment';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

const UserWallet = () => {
  const authData = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(() => null);
  const [balanceLoading, setBalanceLoading] = useState(() => false);
  const [txnLoading, setTxnLoading] = useState(() => false);
  const [txn, setTxn] = useState(() => []);
  const [txnError, setTxnError] = useState(() => false);
  const limit = 20;
  const [page, setPage] = useState(() => 0);
  const [openDetailDialog, setOpenDetailDialog] = useState(() => false);
  const [detailData, setDetailData] = useState(null);

  const closeDetailDialog = () => {
    setDetailData(null);
    setOpenDetailDialog(false);
  };

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

  const handleNextPage = (change) => {
    setPage(page + change);
    fetchTransactions(page + change);
  };

  const fetchTransactions = async (newPage) => {
    if (txn !== null && txn.length >= limit * (newPage + 1)) {
      return;
    }
    setTxnLoading(true);
    try {
      const txnRes = await getUserTransactions(newPage);
      if (txnRes.ok) {
        const txnJson = await txnRes.json();
        setTxn((old) => [...old.slice(0, limit * newPage), ...txnJson]);
        setTxnError(false);
      }
      setTxnLoading(false);
    } catch (err) {
      console.error('Error in fetching txn ' + err);
      setTxnError(true);
    }
  };

  const getUserTransactions = async (newPage) => {
    const response = await fetchPaymentApiWrapper(
      `/api/v1/payment/transaction/user/all?limit=${limit}&page=${newPage}`,
      {
        method: 'GET',
      },
      authData.authData.accessToken,
    );
    return response;
  };

  const columns = [
    { id: 'pic', label: '', minWidth: 50 },
    { id: 'id', label: 'Transaction Id', minWidth: 100 },
    { id: 'amt', label: 'Amount Credit/Debit (₹)', minWidth: 100 },
    {
      id: 'note',
      label: 'Note',

      minWidth: 170,
    },
    {
      id: 'status',
      label: 'Status',

      minWidth: 170,
    },
    {
      id: 'time',
      label: 'Time',

      minWidth: 170,
    },
  ];

  const getTxnStatusByValue = (value) => {
    if (value == 0) return 'In progress';
    if (value == 1) return 'Completed';
    if (value == 2) return 'Failed';
    if (value == 3) return 'Completed';
    return '';
  };

  const getTxnStatusColorByValue = (value) => {
    if (value == 0) return 'blue';
    if (value == 1) return 'green';
    if (value == 2) return 'red';
    if (value == 3) return 'green';
    return '';
  };

  const getTxnTypeByValue = (value) => {
    if (value == 0) return 'Wallet Top-up';
    if (value == 1) return 'Paid for booking';
    if (value == 2) return 'Refund';
    if (value == 3) return 'Earned from booking';
    if (value == 4) return 'Withdrawal';
    if (value == 5) return 'Hold fund released';
    if (value == 6) return 'Added to hold fund';
    return '';
  };

  const getPrefixByValue = (value) => {
    if (value == 0 || value == 2 || value == 3 || value == 6) return '+';
    if (value == 1 || value == 4 || value == 5) return '-';
    return '';
  };

  const getTxnIconByValue = (value) => {
    if (value == 0 || value == 2 || value == 3) return <SouthWestIcon />;
    if (value == 1 || value == 4) return <NorthEastIcon />;
    return <TransferWithinAStationIcon />;
  };

  const TxnInfoDialog = () => {
    return (
      <Dialog open={openDetailDialog} onClose={closeDetailDialog}>
        <DialogTitle>Transaction Detail</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'flex-start',
              margin: '1rem',
            }}>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Transaction Id</Typography>
              {detailData !== null && <Typography>{detailData.id}</Typography>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Booking Id</Typography>
              {detailData !== null && <Typography>{detailData.bookingId}</Typography>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Note</Typography>
              {detailData !== null && <Typography>{detailData.note}</Typography>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Transaction Status</Typography>
              {detailData !== null && (
                <Typography sx={{ color: getTxnStatusColorByValue(detailData.transactionStatus) }}>
                  {getTxnStatusByValue(detailData.transactionStatus)}
                </Typography>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Transaction Type</Typography>
              {detailData !== null && (
                <Typography>{getTxnTypeByValue(detailData.transactionType)}</Typography>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Total Amount (₹)</Typography>
              {detailData !== null && (
                <Typography
                  color={getPrefixByValue(detailData.transactionType) === '+' ? 'green' : 'red'}>
                  {getPrefixByValue(detailData.transactionType) + detailData.totalAmount}
                </Typography>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              {detailData !== null && (
                <Typography sx={{ fontWeight: '200' }}>
                  Amount{' '}
                  {getPrefixByValue(detailData.transactionType) === '+'
                    ? 'Credited to wallet'
                    : 'Debited from wallet'}
                </Typography>
              )}
              {detailData !== null && (
                <Typography
                  color={getPrefixByValue(detailData.transactionType) === '+' ? 'green' : 'red'}>
                  {getPrefixByValue(detailData.transactionType) +
                    (detailData.totalAmount -
                      detailData.tax -
                      detailData.platformFees -
                      detailData.gatewayFees)}
                </Typography>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>GST and Taxes (₹)</Typography>
              {detailData !== null && <Typography>{detailData.tax}</Typography>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Platform Fee (₹)</Typography>
              {detailData !== null && <Typography>{detailData.platformFees}</Typography>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const showDetails = (data) => {
    setDetailData(data);
  };

  useEffect(() => {
    if (detailData !== null) {
      setOpenDetailDialog(true);
    }
  }, [detailData]);

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
            onClick={() => (txn.length === 0 ? fetchTransactions(0) : '')}
            style={{
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: '600',
              margin: '1rem',
              border: '1px solid black',
            }}>
            {txn == null ? 'See Transactions' : 'Transactions'}
          </div>
        </div>
        <div className='txnTableDiv'>
          {txnLoading && <ProfessionalCardSkeleton />}
          {txnError && (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <Typography>Something went wrong. Please try refreshing page again.</Typography>
            </div>
          )}
          {!txnLoading && txn !== null && txn.length > 0 && (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 550 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            color: 'white',
                            backgroundColor: 'black',
                          }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {txn.slice(page * limit, page * limit + limit).map((row) => {
                      return (
                        <>
                          <TableRow
                            onClick={() => showDetails(row)}
                            hover
                            role='checkbox'
                            tabIndex={-1}
                            key={row.id}
                            sx={{ cursor: 'pointer' }}>
                            <>
                              <TableCell key={'pic'} style={{ minWidth: 100 }}>
                                {getTxnIconByValue(row.transactionType)}
                              </TableCell>
                              <TableCell key={'id'} style={{ minWidth: 50 }}>
                                {row.id}
                              </TableCell>
                              <TableCell
                                key={'amt'}
                                style={{
                                  minWidth: 170,
                                  color:
                                    getPrefixByValue(row.transactionType) === '+' ? 'green' : 'red',
                                  fontWeight: '600',
                                }}>
                                {getPrefixByValue(row.transactionType) +
                                  (row.totalAmount - row.tax - row.gatewayFees - row.platformFees)}
                              </TableCell>
                              <TableCell key={'note'} style={{ minWidth: 170 }}>
                                {row.note}
                              </TableCell>
                              <TableCell
                                key={'status'}
                                style={{
                                  minWidth: 170,
                                  color: getTxnStatusColorByValue(row.transactionStatus),
                                }}>
                                {getTxnStatusByValue(row.transactionStatus)}
                              </TableCell>
                              <TableCell key={'time'} style={{ minWidth: 170 }}>
                                {moment(row.updated).format('DD MMM YYYY hh:mm A')}
                              </TableCell>
                            </>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
                <div className='paginationDiv'>
                  {txn.length >= limit * (page + 1) && (
                    <>
                      <div
                        style={{
                          padding: '10px',
                          border: '1px solid grey',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          marginRight: '1rem',
                        }}
                        onClick={() => handleNextPage(1)}>
                        Next
                      </div>
                    </>
                  )}
                  {page > 0 && (
                    <>
                      <div
                        onClick={() => handleNextPage(-1)}
                        style={{
                          padding: '10px',
                          border: '1px solid grey',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          marginRight: '1rem',
                        }}>
                        Previous
                      </div>
                    </>
                  )}
                  {
                    <div
                      style={{
                        color: 'grey',
                      }}>
                      Page : {page + 1}
                    </div>
                  }
                </div>
              </TableContainer>
            </Paper>
          )}
        </div>
        <TxnInfoDialog />
        <Box sx={{ height: '2rem' }}></Box>
      </div>
    </>
  );
};

export default UserWallet;
