import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledSeachHead = styled(Typography)`
  font-weight: 600;
  padding: 2rem;
  text-align: center;
`;

const StyledFormLabel = styled(Typography)`
  font-weight: 600;
  font-size: 1rem;
`;

const StyledSearchButton = styled(IconButton)`
  background: #000;
  color: #fff;
  width: 50px;
  height: 50px;
  margin: auto;
  &:hover {
    background: #00adff;
    color: #fff;
  }
`;

const SearchForm = ({ category, searchName, handleSearchNameInput, handleSearch }) => {
  const handleChange = (e) => {
    handleSearchNameInput(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      // enter key
      handleSearch();
    }
  };

  return (
    <Grid item xs={12} id='search-form'>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={12} md={8} lg={5} xl={5}>
          <StyledSeachHead variant='h5' gutterBottom>
            Find and connect with experts in seconds
          </StyledSeachHead>
          <Paper elevation={6} sx={{ padding: '1rem', borderRadius: '12px' }}>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <StyledFormLabel variant='h6' gutterBottom>
                  Category
                </StyledFormLabel>
                <Typography variant='subtitle1' gutterBottom>
                  {category}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <StyledFormLabel variant='h6' gutterBottom>
                  Search Name
                </StyledFormLabel>
                <TextField
                  variant='standard'
                  id='search-by-name'
                  value={searchName}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  placeholder='Search by name'
                  sx={{ minWidth: '100px' }}
                  fullWidth
                />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <StyledSearchButton onClick={handleSearch}>
                  <SearchOutlined />
                </StyledSearchButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

SearchForm.propTypes = {
  category: PropTypes.string,
  searchName: PropTypes.string,
  handleSearch: PropTypes.func,
  handleSearchNameInput: PropTypes.func,
};
SearchForm.defaultProps = {
  category: '',
  searchName: '',
  handleSearch: () => {},
  handleSearchNameInput: () => {},
};

export default SearchForm;
