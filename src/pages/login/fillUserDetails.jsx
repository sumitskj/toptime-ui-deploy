import {
  AppBar,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import './fillUserDetails.css';
import { LogoWithName } from '../../components/logo/Logo';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { getCategories, storeIsRegisteredUser } from '../../utils/loginStore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openNotification } from '../notifications/slice/notification';
import { postUserDetails } from './api/login';

const FillUserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const categoriesData = getCategories();
  const [gender, setGender] = useState(1);
  const authData = useSelector((state) => state.auth);
  const genderData = [
    {
      id: 'male',
      name: 'Male',
    },
    {
      id: 'female',
      name: 'Female',
    },
    {
      id: 'other',
      name: 'Other',
    },
  ];
  const [preference, setPreference] = useState('');

  const handleSubmitDetails = async () => {
    if (firstName.length !== 0 && lastName.length !== 0 && preference.length !== 0) {
      try {
        const payload = {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          preferredCategory: preference,
        };
        const postUserDetailsResp = await postUserDetails(payload, authData.authData.accessToken);
        if (postUserDetailsResp.ok) {
          storeIsRegisteredUser(true);
          dispatch(
            openNotification({
              severity: 'success',
              message: 'User details submitted successfully',
            }),
          );
          navigate('/', { replace: 'true' });
        }
      } catch (err) {
        console.error('Unable to save user details ', err);
        dispatch(openNotification({ severity: 'error', message: 'Unable to save user details' }));
      }
    } else {
      dispatch(openNotification({ severity: 'error', message: 'Please fill all the details' }));
    }
  };

  return (
    <div style={{ backgroundColor: '#FFECEC' }}>
      <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
        <Toolbar disableGutters>
          <div style={{ marginLeft: '1rem' }}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <div className='fillParentDiv'>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: '600', textAlign: 'center' }}>
          Fill the following details to get started
        </Typography>
        <div className='fillCard'>
          <div className='fillHeadingDiv'>
            <div className='fillErrorHeadingDiv'>
              <Typography sx={{ fontSize: '1rem', fontWeight: '800' }}>First Name</Typography>
              {firstName.length <= 0 && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
            </div>
            <div className='fillInputTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder=''
                autoComplete='true'
                fullWidth={true}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
          </div>
          <div className='fillHeadingDiv'>
            <div className='fillErrorHeadingDiv'>
              <Typography sx={{ fontSize: '1rem', fontWeight: '800' }}>Last Name</Typography>
              {lastName.length <= 0 && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
            </div>
            <div className='fillInputTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder=''
                autoComplete='true'
                fullWidth={true}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className='fillCategoryDiv'>
            <div style={{ marginRight: '2rem', display: 'flex' }}>
              <Typography sx={{ fontWeight: '800' }}>Gender</Typography>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='demo-simple-select-helper-label'>Gender</InputLabel>
                {genderData.length !== 0 && (
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={gender}
                    defaultValue={genderData[0].id}
                    label='Gender'
                    onChange={(event) => setGender(event.target.value)}>
                    {genderData.map((ctg) => (
                      <MenuItem key={ctg.id} value={ctg.id}>
                        {ctg.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </div>
          </div>
          <div className='fillCategoryDiv'>
            <div
              style={{
                marginRight: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Typography sx={{ fontWeight: '800' }}>Your preference</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: '300', color: 'grey' }}>
                Whom do you like to connect with or what is your expertise
              </Typography>
              {preference.length === 0 && <ErrorIcon color='error'></ErrorIcon>}
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='demo-simple-select-helper-label'>Preference</InputLabel>
                {categoriesData.length !== 0 && (
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={preference}
                    defaultValue={categoriesData[0].id}
                    label='Category'
                    onChange={(event) => setPreference(event.target.value)}>
                    {JSON.parse(categoriesData).map((ctg) => (
                      <MenuItem key={ctg.id} value={ctg.id}>
                        {ctg.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </div>
          </div>
          <div className='fillSubmitDiv'>
            <Button
              onClick={handleSubmitDetails}
              sx={{
                color: 'white',
                backgroundColor: 'black',
                border: '0',
                borderRadius: '0',
                padding: '10px',
              }}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillUserDetails;
