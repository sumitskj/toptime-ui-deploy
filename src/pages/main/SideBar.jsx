import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Logo from './Logo';

const sidebarItems = [
  {
    name: 'Home',
    path: '/feeds',
  },
  {
    name: 'My services',
    path: '/my-services',
  },
  {
    name: 'Wallet',
    path: '/wallet',
  },
  {
    name: 'Bookings',
    path: '/bookings',
  },
  {
    name: 'My profile',
    path: '/my-profile',
  },
  {
    name: 'Switch to user mode',
    path: '/switch-user-mode',
  },
];

const CustomisedListItemText = styled(ListItemText)`
  text-decoration: none;
  color: #212426;
  &.active {
    font-weight: 600;
  }
`;

const SideBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobileOpen, handleDrawerToggle, drawerWidth } = props;

  const container = window !== undefined ? window.document.body : undefined;

  const handleListItemClick = (path) => {
    navigate(path, { replace: true });
  };

  const drawer = (
    <div>
      <Toolbar>
        <Logo />
      </Toolbar>
      <List>
        {sidebarItems.map((text) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text.path)} disableRipple>
              <CustomisedListItemText
                primary={text.name}
                className={location.pathname === text.path ? 'active' : ''}
                disableTypography
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}>
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open>
        {drawer}
      </Drawer>
    </>
  );
};

SideBar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number.isRequired,
};

export default SideBar;
