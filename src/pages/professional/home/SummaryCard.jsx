import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMySummary } from './api/profHomeApi';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { round } from 'lodash';

const SummaryCard = () => {
  const dispatch = useDispatch();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const summaryRes = await dispatch(getMySummary()).unwrap();
        if (summaryRes.ok) {
          setSummary(await summaryRes.json());
        }
      } catch (err) {
        console.error('Error in fetching summary ', err);
        setError(true);
      }
      setLoading(false);
    };
    fetchSummary();
  }, []);

  return (
    <Box
      sx={{
        pl: { xs: '0rem', md: '4rem' },
        pr: { xs: '0rem', md: '4rem' },
        pt: '2rem',
        pb: '2rem',
        m: '0rem 0rem',
        backgroundColor: '#FFF5E4',
      }}>
      {!loading && !error && summary !== null && (
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                m: { xs: '12px', md: '16px' },
                fontWeight: '600',
              }}>
              Summary and Earnings
            </Typography>
          </Box>

          <Grid container justifyContent={'space-around'}>
            <Grid item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  fontSize: { xs: '1.5rem', md: '2.4rem' },
                  fontWeight: '600',
                }}>
                <CurrencyRupeeIcon sx={{ fontSize: { xs: '1.5rem', md: '2.4rem' } }} />
                {round(summary.totalEarning, 1)}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                }}>
                <Typography sx={{ fontSize: { xs: '1rem', md: '2rem' }, fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>{summary.totalBookings}</span> Bookings
                </Typography>
                <Typography sx={{ fontSize: { xs: '1rem', md: '2rem' }, fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>{summary.avgRating}/5</span> Rating
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SummaryCard;
