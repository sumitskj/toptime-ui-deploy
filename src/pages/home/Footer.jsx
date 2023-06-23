import React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const Footer = () => {
  return (
    <Box
      mt={'1rem'}
      sx={{
        pl: { xs: '2rem', md: '4rem' },
        pr: { xs: '2rem', md: '4rem' },
        pt: '2rem',
      }}>
      <Grid
        container
        sx={{ background: 'white', justifyContent: { xs: 'center', sm: 'space-between' } }}>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
          <List>
            <ListItem
              onClick={() =>
                window.open(
                  'https://toptime.s3.ap-south-1.amazonaws.com/static-sites/about-us.html',
                  '_blank',
                )
              }>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='About Us'
              />
            </ListItem>
            <ListItem
              onClick={() =>
                window.open(
                  'https://toptime.s3.ap-south-1.amazonaws.com/static-sites/terms-conditions.html',
                  '_blank',
                )
              }>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='Terms and Conditions'
              />
            </ListItem>
            <ListItem
              onClick={() =>
                window.open(
                  'https://toptime.s3.ap-south-1.amazonaws.com/static-sites/privacy-policy.html',
                  '_blank',
                )
              }>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='Privacy Policy'
              />
            </ListItem>
            <ListItem
              onClick={() =>
                window.open(
                  'https://toptime.s3.ap-south-1.amazonaws.com/static-sites/cancellation-refund.html',
                  '_blank',
                )
              }>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='Cancellation and Refunds'
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4} sx={{ padding: '2rem' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <EmailRoundedIcon style={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary='management@toptime.club' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CopyrightIcon style={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary='2023 TopTime' />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
