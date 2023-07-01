import { useEffect, useState } from 'react';
import './profWallet.css';
import { fetchPaymentApiWrapper } from '../../../utils';
import { useSelector } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import moment from 'moment';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
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

const ProfessionalWallet = () => {
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
  const [txnWithdrawToggle, setTxnWithdrawToggle] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setBalanceLoading(true);
    const balRes = await getProfessionalBalance();
    if (balRes.ok) {
      const balJson = await balRes.json();
      console.log('Professional Balance : ', balJson);
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
      const txnRes = await getProfessionalTransactions(newPage);
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

  const getProfessionalTransactions = async (newPage) => {
    const response = await fetchPaymentApiWrapper(
      `/api/v1/payment/transaction/professional/all?limit=${limit}&page=${newPage}`,
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

  const closeDetailDialog = () => {
    setDetailData(null);
    setOpenDetailDialog(false);
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
              {detailData !== null && (
                <Typography sx={{ color: 'red' }}>{detailData.tax}</Typography>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography sx={{ fontWeight: '200' }}>Platform Fee (₹)</Typography>
              {detailData !== null && (
                <Typography sx={{ color: 'red' }}>{detailData.platformFees}</Typography>
              )}
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

  const handleTxnToggle = () => {
    if (txn.length === 0) {
      fetchTransactions(0);
    }
    setTxnWithdrawToggle(1);
  };

  const handleWithdrawToggle = () => {
    setTxnWithdrawToggle(2);
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
            onClick={() => handleTxnToggle()}
            style={{
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: `${txnWithdrawToggle === 1 ? 'black' : 'white'}`,
              color: `${txnWithdrawToggle === 1 ? 'white' : 'black'}`,
              fontWeight: '600',
              margin: '1rem',
              border: '1px solid black',
            }}>
            See Transactions
          </div>
          <div
            onClick={() => handleWithdrawToggle()}
            style={{
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: `${txnWithdrawToggle === 2 ? 'black' : 'white'}`,
              color: `${txnWithdrawToggle === 2 ? 'white' : 'black'}`,
              fontWeight: '600',
              margin: '1rem',
              border: '1px solid black',
              cursor: 'pointer',
            }}>
            See Withdrawals
          </div>
        </div>
        <div className='txnTableDiv'>
          {txnLoading && <ProfessionalCardSkeleton />}
          {txnError && (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <Typography>Something went wrong. Please try refreshing page again.</Typography>
            </div>
          )}
          {!txnLoading && txn !== null && txn.length > 0 && txnWithdrawToggle === 1 && (
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

export default ProfessionalWallet;
