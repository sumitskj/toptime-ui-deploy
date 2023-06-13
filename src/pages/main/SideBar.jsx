import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import Logo from '../../components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMode } from '../login/slice/login';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import Person3RoundedIcon from '@mui/icons-material/Person3Rounded';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

const sidebarUserItems = [
  {
    name: 'Home',
    path: '/user/feeds',
    icon: <HomeRoundedIcon />,
  },
  {
    name: 'Explore',
    path: '/user/explore',
    icon: <TravelExploreRoundedIcon />,
  },
  {
    name: 'Wallet',
    path: '/user/wallet',
    icon: <WalletRoundedIcon />,
  },
  {
    name: 'Bookings',
    path: '/user/bookings',
    icon: <BookOnlineRoundedIcon />,
  },
  {
    name: 'My Profile',
    path: '/user/my-profile',
    icon: <Person3RoundedIcon />,
  },
  {
    name: 'My Raised Issues',
    path: '/user/raised-issues',
    icon: <FeedbackRoundedIcon />,
  },
  {
    name: 'Register as Professional',
    path: '/user/register-as-professional',
    icon: <AppRegistrationRoundedIcon />,
  },
];

const sidebarProfessionlItems = [
  {
    name: 'Home',
    path: '/professional/home',
    icon: <HomeRoundedIcon />,
  },
  {
    name: 'Bookings',
    path: '/professional/bookings',
    icon: <BookOnlineRoundedIcon />,
  },
  {
    name: 'Wallet',
    path: '/professional/wallet',
    icon: <WalletRoundedIcon />,
  },
  {
    name: 'My profile',
    path: '/professional/my-profile',
    icon: <Person3RoundedIcon />,
  },
  {
    name: 'My services',
    path: '/professional/my-services',
    icon: <GridViewRoundedIcon />,
  },
  {
    name: 'Monetize other skill',
    path: '/professional/register-other-skill',
    icon: <AppRegistrationRoundedIcon />,
  },
];

const CustomisedListItemText = styled(ListItemText)`
  text-decoration: none;
  font-family: 'Rubik';
  color: #212426;
  padding: 4px;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const CustomisedListItemButton = styled(ListItemButton)`
  text-decoration: none;
  border-radius: 10px;
  &.active {
    font-weight: 600;
    background-color: #ebebeb;
  }
`;

const SideBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.auth.currentMode);
  const { mobileOpen, handleDrawerToggle, drawerWidth } = props;

  const container = window !== undefined ? window.document.body : undefined;

  useEffect(() => {
    if (location.pathname.includes('/user/')) {
      toggleMode('user');
    }
    if (location.pathname.includes('/professional/')) {
      toggleMode('professional');
    }
  }, []);

  const handleListItemClick = (path) => {
    navigate(path, { replace: true });
  };

  const toggleMode = (curMode) => {
    dispatch(setCurrentMode(curMode));
    if (curMode === 'user') {
      navigate('/user/feeds', { replace: true });
    }
    if (curMode === 'professional') {
      navigate('/professional/home', { replace: true });
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Link to='/'>
          <Logo />
        </Link>
      </Toolbar>
      <List>
        <ListItem
          sx={{
            color: 'orange',
            fontWeight: '500',
            fontFamily: 'Rubik',
            border: '10px',
            fontSize: '1rem',
          }}>
          {currentMode === 'professional' ? 'Professional Mode' : 'User Mode'}
        </ListItem>
        {currentMode === 'user' &&
          sidebarUserItems.map((text) => (
            <ListItem
              key={text.name}
              sx={{
                paddingTop: '0px',
                paddingBottom: '0px',
                paddingLeft: '12px',
                paddingRight: '12px',
              }}>
              <CustomisedListItemButton
                onClick={() => handleListItemClick(text.path)}
                disableRipple
                className={location.pathname === text.path ? 'active' : ''}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <CustomisedListItemText primary={text.name} disableTypography />
              </CustomisedListItemButton>
            </ListItem>
          ))}
        {currentMode === 'professional' &&
          sidebarProfessionlItems.map((text) => (
            <ListItem
              key={text.name}
              sx={{
                paddingTop: '0px',
                paddingBottom: '0px',
                paddingLeft: '12px',
                paddingRight: '12px',
              }}>
              <CustomisedListItemButton
                onClick={() => handleListItemClick(text.path)}
                disableRipple
                className={location.pathname === text.path ? 'active' : ''}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <CustomisedListItemText primary={text.name} disableTypography />
              </CustomisedListItemButton>
            </ListItem>
          ))}
        {currentMode === 'professional' && (
          <ListItem
            key='Switch to user mode'
            sx={{
              paddingTop: '0px',
              paddingBottom: '0px',
              paddingLeft: '12px',
              paddingRight: '12px',
            }}>
            <ListItemButton onClick={() => toggleMode('user')} disableRipple>
              <ListItemIcon>
                <ChangeCircleRoundedIcon />
              </ListItemIcon>
              <CustomisedListItemText primary='Switch to user mode' disableTypography />
            </ListItemButton>
          </ListItem>
        )}
        {currentMode === 'user' && (
          <ListItem
            key='Switch to professional mode'
            sx={{
              paddingTop: '0px',
              paddingBottom: '0px',
              paddingLeft: '12px',
              paddingRight: '12px',
            }}>
            <ListItemButton onClick={() => toggleMode('professional')} disableRipple>
              <ListItemIcon>
                <ChangeCircleRoundedIcon />
              </ListItemIcon>
              <CustomisedListItemText primary='Switch to professional mode' disableTypography />
            </ListItemButton>
          </ListItem>
        )}
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderWidth: '0px' },
          color: '#FBF9F9',
        }}>
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        PaperProps={{ sx: { backgroundColor: '#FBF9F9' } }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderWidth: '0px' },
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
