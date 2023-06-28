import React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PlayStoreImg from '../../static/images/google-play-badge.png';

const Footer = () => {
  return (
    <Box
      mt={'1rem'}
      sx={{
        pl: { xs: '0rem', md: '4rem' },
        pr: { xs: '0rem', md: '4rem' },
        pt: '2rem',
      }}>
      <Grid
        container
        sx={{ background: 'white', justifyContent: { xs: 'center', sm: 'space-between' } }}>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
          <List>
            <ListItem onClick={() => window.open(`${window.location.origin}/about-us`, '_blank')}>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='About Us'
              />
            </ListItem>
            <ListItem
              onClick={() =>
                window.open(`${window.location.origin}/terms-and-conditions`, '_blank')
              }>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='Terms and Conditions'
              />
            </ListItem>
            <ListItem
              onClick={() => window.open(`${window.location.origin}/privacy-policy`, '_blank')}>
              <ListItemText
                sx={{ textAlign: { xs: 'center', sm: 'start' }, cursor: 'pointer' }}
                primary='Privacy Policy'
              />
            </ListItem>
            <ListItem
              onClick={() =>
                window.open(`${window.location.origin}/cancellation-and-refund-policy`, '_blank')
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
            <ListItem>
              <a href='https://play.google.com/store/apps/details?id=club.toptime.toptime_main&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <img alt='Get it on Google Play' height={100} src={PlayStoreImg} />
              </a>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
