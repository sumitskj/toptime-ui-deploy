import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, keys } from 'lodash';

import { getCategories } from '../common/api/categories';
import { setCategories } from '../common/slice/categories';
import styled from '@emotion/styled';

const Categories = ({ selected }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categoriesData = useSelector((state) => state.categories);

  const categoriesToJson = (data) => {
    let cateJson = [{ id: -1, label: 'All', image: '', hex: '' }];
    keys(data).forEach((key) => {
      console.log(key);
      const value = data[key].split('|');
      cateJson.push({
        id: Number(value[0]),
        label: key,
        image: value[1],
        hex: value[2],
      });
    });
    return cateJson;
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getCategories()).unwrap();
      if (res.ok) {
        const resJson = await res.json();
        const jsonValues = categoriesToJson(resJson);
        dispatch(setCategories(jsonValues));
      }
    } catch (err) {
      setError(true);
      console.log('something went wrong ', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const selectedCategory = get(selected, 'category', 'All');

  const activeClass = (label) => (label === selectedCategory ? 'active' : '');

  const StyledBoxScrollable = styled(Box)`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    --webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
      width: none;
      height: 0;
      -ms-overflow-style: none;
    }
  `;

  return (
    <Box
      id='explore'
      sx={{
        pt: '2rem',
        mt: '0rem',
      }}>
      {!location.pathname.includes('/explore/') && (
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
            fontWeight: '600',
            pl: { xs: '1rem', md: '5rem' },
          }}>
          Explore Experts
        </Typography>
      )}
      {!loading && !error && (
        <Grid item container justifyContent='space-between' xs={12}>
          <StyledBoxScrollable sx={{ pl: { xs: '0', md: '4rem' }, pr: { xs: '0', md: '4rem' } }}>
            {categoriesData.map((c) => (
              <Box
                key={c.id}
                sx={{
                  flex: '0 0 auto',
                  p: '24px 10px',
                }}>
                <Link to={`/explore/${c.label}`} className={`nav-item ${activeClass(c.label)}`}>
                  {c.label}
                </Link>
              </Box>
            ))}
          </StyledBoxScrollable>
        </Grid>
      )}
      {loading && <CircularProgress style={{ color: 'black' }} />}
      {error && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
          }}>
          Somehting went wrong. Please try again or check your internet connection.
        </Box>
      )}
    </Box>
  );
};

Categories.propTypes = {
  selected: PropTypes.shape({
    category: PropTypes.string,
  }),
};
Categories.defaultProps = {
  selected: {
    category: '',
  },
};

export default Categories;
