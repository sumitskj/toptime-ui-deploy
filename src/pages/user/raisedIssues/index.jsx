import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRaisedIssues } from './api/raisedIssuesApi';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import './raisedIssues.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

const MyRaisedIssues = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState(() => []);
  const [page, setPage] = useState(0);
  const limit = 15;

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const issuesRes = await dispatch(fetchRaisedIssues({ page: page, limit: limit })).unwrap();
      if (issuesRes.ok) {
        const issuesjson = await issuesRes.json();
        setIssues(issuesjson);
      }
    } catch (err) {
      setError(true);
      console.error('Error in fetching raised issues ', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [page]);

  return (
    <div className='issuesParentDiv'>
      {loading && <ProfessionalCardSkeleton />}
      {error && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Typography>Something went wrong. Please try refreshing page again.</Typography>
        </div>
      )}
      {!loading && !error && issues.length === 0 && (
        <Typography sx={{ mt: '5rem' }}>You have no issues raised</Typography>
      )}
      {!loading && !error && issues.length > 0 && (
        <>
          <div className='issuesDiv'>
            <div className='issuesTitleDiv'>
              <Grid container spacing={0}>
                <Grid item xs={3}>
                  <div className='titleDiv'>Issue Id</div>
                </Grid>
                <Grid item xs={3}>
                  <div className='titleDiv'>BookingId</div>
                </Grid>
                <Grid item xs={3}>
                  <div className='titleDiv'>Creation Time</div>
                </Grid>
                <Grid item xs={3}>
                  <div className='titleDiv'>Status</div>
                </Grid>
              </Grid>
            </div>
            {issues.length > 0 &&
              issues.map((data) => (
                <div key={data.complainId} className='accordianDiv'>
                  <Accordion
                    style={{ position: 'relative', width: '100%', backgroundColor: '#F2FAFF' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'>
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <div className='summaryItemDiv'>{data.complainId}</div>
                        </Grid>
                        <Grid item xs={3}>
                          <div className='summaryItemDiv'>{data.bookingId}</div>
                        </Grid>
                        <Grid item xs={3}>
                          <div className='summaryItemDiv'>
                            {moment(data.created).format('DD MMM YYYY hh:mm A')}
                          </div>
                        </Grid>
                        <Grid item xs={3}>
                          <div className='summaryItemDiv'>
                            {data.complainStatus === 0
                              ? 'OPEN'
                              : data.complainStatus === 1
                              ? 'ON-HOLD'
                              : 'RESOLVED'}
                          </div>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{ color: 'grey' }}>
                        {'Issue Detail: ' + data.complainDescription}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
          </div>
          <div className='pageDiv'>
            {issues.length === limit && (
              <div className='pageOpDiv' onClick={() => setPage((prev) => prev + 1)}>
                Next
              </div>
            )}
            {page > 0 && (
              <div className='pageOpDiv' onClick={() => setPage((prev) => prev - 1)}>
                Previous
              </div>
            )}
            {'Page: ' + page}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRaisedIssues;
