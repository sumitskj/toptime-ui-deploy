import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Box, Button, IconButton, Typography, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getCategories } from '../common/api/categories';
import { setCategories } from '../common/slice/categories';
import { keys } from 'lodash';
import './main.css';

import SideBar from './SideBar';
import { Logo, LogoWithName } from '../../components/logo/Logo';
import { getIsRegisteredUser } from '../../utils/loginStore';

const CustomisedBecomeExpert = styled(Button)`
  font-weight: 600;
  border: 1px solid #000;
  background: #000;
  color: #ffffff;
  :hover {
    background: #000;
    border: 2px solid #000;
    transform: scale(1.01);
  }
`;

const drawerWidth = 240;

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth);

  const handleLogIn = () => {
    navigate('/login');
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const calcDrawerWidth = authData.isAuthenticated ? drawerWidth : 0;

  // store categories details
  const categoriesData = useSelector((state) => state.categories);

  const categoriesToJson = (data) => {
    const cateJson = [];
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
    if (authData.isAuthenticated && !JSON.parse(getIsRegisteredUser())) {
      navigate('/fill-user-details', { replace: 'true' });
    }
  }, []);

  const trigger = useScrollTrigger();

  return (
    <div>
      <AppBar
        elevation={10}
        style={{
          backgroundColor: `${trigger ? '#f8f7f1' : 'white'}`,
          boxShadow: '0 2px 1px -1px #f8f7f1',
        }}>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            padding: '0',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {authData.isAuthenticated && (
              <>
                <IconButton
                  color='inherit'
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}>
                  <MenuIcon />
                </IconButton>
                <Box sx={{ display: { sm: 'none' } }}>
                  <Link to='/'>
                    <Logo />
                  </Link>
                </Box>
              </>
            )}
            {!authData.isAuthenticated && (
              <>
                <Box
                  sx={{
                    marginLeft: { xs: '2rem', md: '4rem' },
                    display: { xs: 'none', sm: 'block' },
                  }}>
                  <Link to='/'>
                    <LogoWithName />
                  </Link>
                </Box>
                <Box
                  sx={{
                    marginLeft: { xs: '2rem', md: '4rem' },
                    display: { xs: 'block', sm: 'none' },
                  }}>
                  <Link to='/'>
                    <Logo />
                  </Link>
                </Box>
                <Box
                  onClick={() => <Link to={'#explore'}></Link>}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    m: {
                      xs: '0 2rem',
                      md: '0 3rem',
                    },
                    fontWeight: '600',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    ':hover': {
                      transform: 'scale(1.05)',
                    },
                  }}>
                  <a href='#explore' style={{ textDecoration: 'none', color: 'black' }}>
                    Explore
                  </a>
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: '600',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    ':hover': {
                      transform: 'scale(1.05)',
                    },
                  }}>
                  Pricing
                </Box>
              </>
            )}
          </div>
          {!authData.isAuthenticated && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CustomisedBecomeExpert variant='outlined' onClick={handleLogIn}>
                SIGN IN
              </CustomisedBecomeExpert>
              <Button
                variant='outlined'
                sx={{
                  display: {
                    sm: 'block',
                    xs: 'none',
                  },
                  fontWeight: '600',
                  color: 'black',
                  border: '2px solid black',
                  marginRight: { xs: '2rem', md: '4rem' },
                  ml: 1,
                  ':hover': {
                    transform: 'scale(1.02)',
                    backgroundColor: 'white',
                    border: '2px solid black',
                  },
                }}
                onClick={handleLogIn}>
                BECOME EXPERT
              </Button>
              <div className='dropdown'>
                <IconButton
                  className='dropbtn'
                  color='inherit'
                  sx={{
                    marginRight: { xs: '2rem', md: '4rem' },
                    display: { sm: 'none' },
                    backgroundColor: '#F8F7F1',
                    borderRadius: '4px',
                    ml: 1,
                  }}>
                  <MenuIcon />
                </IconButton>
                <div className='dropdown-content'>
                  <IconButton sx={{ borderRadius: '0px', width: '100%' }} onClick={handleLogIn}>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'black',
                      }}>
                      Become Expert
                    </Typography>
                  </IconButton>
                  <IconButton sx={{ borderRadius: '0px', width: '100%' }}>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'black',
                      }}>
                      <a href='#explore' style={{ textDecoration: 'none', color: 'black' }}>
                        Explore
                      </a>
                    </Typography>
                  </IconButton>
                  <IconButton sx={{ borderRadius: '0px', width: '100%' }} onClick={handleLogIn}>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'black',
                      }}>
                      Pricing
                    </Typography>
                  </IconButton>
                </div>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {authData.isAuthenticated && (
        <Box
          component='nav'
          sx={{ width: { sm: calcDrawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'>
          <SideBar
            drawerWidth={calcDrawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
      )}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { flexGrow: 1, sm: `calc(100% - ${calcDrawerWidth}px)` },
          ml: { sm: `${calcDrawerWidth}px` },
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default Main;
