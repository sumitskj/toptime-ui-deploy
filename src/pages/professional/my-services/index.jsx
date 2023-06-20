import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyServices } from './api/myServices';
import './services.css';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import { useNavigate } from 'react-router-dom';

const MyServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleEditProfile = (pid) => {
    navigate('/professional/update-profile?professionalId=' + pid);
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
                  <div
                    style={{
                      display: 'flex',
                      position: 'relative',
                      width: '80%',
                      justifyContent: 'flex-end',
                    }}>
                    <div
                      style={{
                        padding: '8px',
                        fontSize: '0.5rem',
                        color: 'white',
                        backgroundColor: `${data.status === 2 ? 'grey' : '#03C988'}`,
                        borderRadius: '4px',
                        fontWeight: '600',
                      }}>
                      {data.status === 2 ? 'Inactive' : 'Active'}
                    </div>
                  </div>
                  <div style={{ fontWeight: '600', textAlign: 'center', fontSize: '1.4rem' }}>
                    {findCategoryItem(data.category).label}
                  </div>
                  <div
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative',
                      width: '80%',
                    }}>
                    <div>{data.sessionsCompleted + ' ✅ Bookings'}</div>
                    <div>{data.rating + '/5 ⭐️ Rating'}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEditProfile(data.professionalId)}
                      style={{
                        marginTop: '1.5rem',
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
