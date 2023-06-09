import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Logo from '../../components/logo/Logo';
import { useSelector } from 'react-redux';

const sidebarUserItems = [
  {
    name: 'Home',
    path: '/user/feeds',
  },
  {
    name: 'Explore',
    path: '/user/explore',
  },
  {
    name: 'Wallet',
    path: '/user/wallet',
  },
  {
    name: 'Bookings',
    path: '/user/bookings',
  },
  {
    name: 'My Profile',
    path: '/user/my-profile',
  },
  {
    name: 'My Raised Issues',
    path: '/user/raised-issues',
  },
  {
    name: 'Register as Professional',
    path: '/user/register-as-professional',
  },
];

const sidebarProfessionlItems = [
  {
    name: 'Home',
    path: '/professional/feeds',
  },
  {
    name: 'Bookings',
    path: '/professional/bookings',
  },
  {
    name: 'Wallet',
    path: '/professional/wallet',
  },
  {
    name: 'My profile',
    path: '/professional/my-profile',
  },
  {
    name: 'My services',
    path: '/professional/my-services',
  },
  {
    name: 'Monetize other skill',
    path: '/professional/register-other-skill',
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
  const loginData = useSelector((state) => state.auth);
  const { mobileOpen, handleDrawerToggle, drawerWidth } = props;

  const container = window !== undefined ? window.document.body : undefined;

  const handleListItemClick = (path) => {
    navigate(path, { replace: true });
  };

  useEffect(() => {}, [loginData.alreadyAppliedCategories]);

  const drawer = (
    <div>
      <Toolbar>
        <Link to='/'>
          <Logo />
        </Link>
      </Toolbar>
      <List>
        <ListItem sx={{ color: 'orange', fontWeight: '500', fontFamily: 'Rubik' }}>
          {loginData.alreadyAppliedCategories.length > 0 ? 'Professional Mode' : 'User Mode'}
        </ListItem>
        {!loginData.alreadyAppliedCategories.length > 0 &&
          sidebarUserItems.map((text) => (
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
        {loginData.alreadyAppliedCategories.length > 0 &&
          sidebarProfessionlItems.map((text) => (
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
