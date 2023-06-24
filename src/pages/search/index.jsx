import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import { find, times } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { openNotification } from '../notifications/slice/notification';
import ProfessionalCardSkeleton from '../../components/skeleton/ProfessionalCardSkeleton';
import Categories from '../home/Categories';
import SearchForm from './SearchForm';

import { searchByCategory, searchByCategoryAndName, searchByOnlyName } from './api/search';
import { setSearchResults } from './slice/search';
import { LogoWithName } from '../../components/logo/Logo';
import UserDetailCard from './UserDetailCard';

const Search = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const limit = 15;

  const pageNoRef = useRef(0);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');

  const categories = useSelector((state) => state.categories);
  const searchResults = useSelector((state) => state.search);

  const findCategory = (query, returnKey = 'id') => {
    const findItem = find(categories, { ...query });
    if (findItem) {
      return findItem[returnKey];
    }
    // default category
    return returnKey === 'id' ? -1 : 'All';
  };

  const handleSearchNameInput = (value) => {
    pageNoRef.current = 0;
    setSearchName(value);
  };

  const handleSearchByCategoryAndName = async () => {
    try {
      setLoading(true);
      const categoryNum = findCategory({ label: params.category }, 'id');
      let resp = null;
      if (categoryNum !== -1) {
        resp = await dispatch(
          searchByCategoryAndName({
            category: categoryNum,
            name: searchName,
            page: pageNoRef.current,
            limit: limit,
          }),
        ).unwrap();
      } else {
        resp = await dispatch(
          searchByOnlyName({ name: searchName, page: pageNoRef.current, limit: limit }),
        ).unwrap();
      }
      setLoading(false);
      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setSearchResults({ page: pageNoRef.current, data: resJson }));
      }
    } catch (error) {
      console.log('Error:: Search by category::: ', error);
      setLoading(false);
      dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
    }
  };

  const handleSearchByCategory = async () => {
    try {
      setLoading(true);
      const categoryNum = findCategory({ label: params.category }, 'id');
      let resp = null;
      if (categoryNum !== -1) {
        resp = await dispatch(
          searchByCategory({ category: categoryNum, page: pageNoRef.current, limit: limit }),
        ).unwrap();
      } else {
        resp = await dispatch(
          searchByOnlyName({ name: '', page: pageNoRef.current, limit: limit }),
        ).unwrap();
      }
      setLoading(false);
      if (resp.ok) {
        const resJson = await resp.json();
        dispatch(setSearchResults({ page: pageNoRef.current, data: resJson }));
      }
    } catch (error) {
      console.log('Error:: Search by category::: ', error);
      setLoading(false);
      dispatch(openNotification({ severity: 'error', message: 'Something went wrong!' }));
    }
  };

  useEffect(() => {
    pageNoRef.current = 0;
    setSearchName('');
    dispatch(setSearchResults({ page: 0, data: [] }));
    handleSearchByCategory();
  }, [params.category]);

  const handlePageChange = (change) => {
    pageNoRef.current = pageNoRef.current + change;
    handleSearchByCategoryAndName();
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <>
      {!location.pathname.includes('/user/explore') && (
        <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
          <Toolbar disableGutters>
            <div style={{ marginLeft: '1rem', cursor: 'pointer' }} onClick={handleNavigateHome}>
              <LogoWithName />
            </div>
          </Toolbar>
        </AppBar>
      )}
      <Grid container>
        <Categories selected={params} />
        <SearchForm
          category={params.category}
          searchName={searchName}
          handleSearchNameInput={handleSearchNameInput}
          handleSearch={handleSearchByCategoryAndName}
        />
        {/* search results */}
        <Grid item xs={12}>
          <Grid container spacing={4} sx={{ p: '2rem 3rem' }}>
            {searchResults.length > 0 && (
              <>
                {searchResults.map((u) => (
                  <Grid key={u.id} item xs={12} sm={6} md={4} lg={3}>
                    <UserDetailCard
                      data={u}
                      navKey='id'
                      category={findCategory({ id: u.category }, 'label')}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        {/* loading state */}
        <Grid item xs={12}>
          <Grid container>
            {loading && (
              <Grid item xs={12} sx={{ padding: '1rem 2rem', margin: '0 auto' }}>
                {times(8).map((v) => (
                  <ProfessionalCardSkeleton key={v} width='21%' />
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        {/* no data available */}
        {searchResults.length === 0 && (
          <Grid container item xs={12} justifyContent='center' sx={{ padding: '2rem 0' }}>
            <Typography variant='subtitle2' component='div' gutterBottom>
              No data available
            </Typography>
          </Grid>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            mt: '2rem',
          }}>
          {/* {pageNoRef.current > 0 && (
            <Box
              onClick={() => handlePageChange(-1)}
              sx={{
                padding: '12px',
                borderRadius: '20px',
                border: '1px solid black',
                color: 'black',
                marginRight: '1rem',
              }}>
              Previous
            </Box>
          )} */}
          {searchResults.length >= limit * (pageNoRef.current + 1) && (
            <Box
              onClick={() => handlePageChange(1)}
              sx={{
                padding: '12px',
                borderRadius: '20px',
                border: '1px solid black',
                color: 'black',
                marginRight: '1rem',
              }}>
              Load more
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Search;
