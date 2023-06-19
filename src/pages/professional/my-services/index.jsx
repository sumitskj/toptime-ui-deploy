import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyServices } from './api/myServices';
import './services.css';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';

const MyServices = () => {
  const dispatch = useDispatch();
  const [services, setServices] = useState(() => []);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const categoriesData = useSelector((state) => state.categories);
  useEffect(() => {
    const getMyServices = async () => {
      try {
        setLoader(true);
        const servicesResp = await dispatch(fetchMyServices()).unwrap();
        if (servicesResp.ok) {
          const servicesJson = await servicesResp.json();
          setServices(servicesJson);
        }
      } catch (err) {
        console.error('Error in fetching my services: ', err);
        setError(true);
      }
      setLoader(false);
    };
    getMyServices();
  }, []);

  const findCategoryItem = (category) => {
    const item = categoriesData.find((o) => o.id === category);
    if (item) {
      return item;
    }
    return categoriesData[0];
  };

  return (
    <div className='servicesParentDiv'>
      {loading && <ProfessionalCardSkeleton />}
      {error && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Typography>Something went wrong. Please try refreshing page again.</Typography>
        </div>
      )}
      {!error && !loading && (
        <div className='serviceDiv'>
          <Grid container spacing={3}>
            {services.map((data) => (
              <Grid key={data.professionalId} item xs={12} sm={6} md={4} lg={4}>
                <div
                  style={{
                    backgroundColor: `#${findCategoryItem(data.category)
                      .hex.toString()
                      .substring(4)}`,
                  }}
                  className='serviceCard'>
                  <div style={{ fontWeight: '600', textAlign: 'center', fontSize: '1.2rem' }}>
                    {findCategoryItem(data.category).label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative',
                      width: '80%',
                    }}>
                    <div style={{ fontWeight: '600' }}>{data.sessionsCompleted + ' ✅'}</div>
                    <div
                      style={{
                        margin: '1rem 0rem',
                        padding: '8px',
                        fontSize: '0.5rem',
                        color: 'white',
                        backgroundColor: `${data.status === 2 ? 'red' : 'green'}`,
                        borderRadius: '4px',
                        fontWeight: '600',
                      }}>
                      {data.status === 2 ? 'Inactive' : 'Active'}
                    </div>
                    <div style={{ fontWeight: '600' }}>{data.rating + '/5 ⭐️'}</div>
                  </div>
                  <div>
                    <button
                      style={{
                        border: '0',
                        borderRadius: '4px',
                        padding: '6px',
                        color: 'white',
                        backgroundColor: 'black',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                      }}>
                      Update Profile ➜
                    </button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default MyServices;
