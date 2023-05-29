import React from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const Footer = () => {
  return (
    <Grid container sx={{ background: '#F2FAFF' }} justifyContent='space-between'>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '2rem' }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='+91-8390548958' />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='management@toptime.club' />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <List>
          <ListItem>
            <ListItemText primary='About Us' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Terms and Conditions' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Privacy Policy' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Cancellation and Refunds' />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Footer;
