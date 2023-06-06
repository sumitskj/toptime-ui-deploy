import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import Categories from '../home/Categories';

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

const Search = () => {
  const params = useParams();

  const handleSearch = () => {};

  return (
    <Grid container>
      <Categories selected={params} />
      <Grid item xs={12} id='search-form'>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={12} md={8} lg={5} xl={5}>
            <StyledSeachHead variant='h5' gutterBottom>
              Find and connect with experts in seconds
            </StyledSeachHead>
            <Paper elevation={6} sx={{ padding: '1rem' }}>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <StyledFormLabel variant='h6' gutterBottom>
                    Category
                  </StyledFormLabel>
                  <Typography variant='subtitle1' gutterBottom>
                    {params.category}
                  </Typography>
                </Grid>
                <Grid item>
                  <StyledFormLabel variant='h6' gutterBottom>
                    Search by name
                  </StyledFormLabel>
                  <TextField
                    variant='standard'
                    id='search-by-name'
                    placeholder='search by name'
                    sx={{ minWidth: '64px' }}
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
      <Grid item xs={12}>
        Search results
      </Grid>
    </Grid>
  );
};

export default Search;
