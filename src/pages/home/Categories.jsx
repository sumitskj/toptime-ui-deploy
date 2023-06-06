import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, keys } from 'lodash';

import { getCategories } from '../common/api/categories';
import { setCategories } from '../common/slice/categories';

const Categories = ({ selected }) => {
  const dispatch = useDispatch();

  const categoriesData = useSelector((state) => state.categories);

  const categoriesToJson = (data) => {
    const cateJson = [];
    keys(data).forEach((key) => {
      console.log(key);
      const value = data[key].split('|');
      cateJson.push({
        id: value[0],
        label: key,
        image: value[1],
        hex: value[2],
      });
    });
    return cateJson;
  };

  const fetchCategories = async () => {
    try {
      const res = await dispatch(getCategories()).unwrap();
      if (res.ok) {
        const resJson = await res.json();
        const jsonValues = categoriesToJson(resJson);
        dispatch(setCategories(jsonValues));
      }
    } catch (error) {
      console.log('something went wrong');
    }
  };

  useEffect(() => {
    if (categoriesData && categoriesData.length === 0) {
      fetchCategories();
    }
  }, []);

  const selectedCategory = get(selected, 'category', '');

  const activeClass = (label) => (label === selectedCategory ? 'active' : '');

  return (
    <Grid item container justifyContent='space-between' xs={12} sx={{ p: '0 8rem;' }}>
      {categoriesData.map((c) => (
        <Link key={c.id} to={`/explore/${c.label}`} className={`nav-item ${activeClass(c.label)}`}>
          {c.label}
        </Link>
      ))}
    </Grid>
  );
};

Categories.propTypes = {
  selected: PropTypes.objectOf({
    category: PropTypes.string,
  }),
};
Categories.defaultProps = {
  selected: {
    category: '',
  },
};

export default Categories;
