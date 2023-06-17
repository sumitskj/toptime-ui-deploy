import { Typography, InputBase } from '@mui/material';
import './registerAsProfessional.css';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

const RegisterAsProfessional = () => {
  const [title, setTitle] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [yearsOfExp, setYearsOfExp] = useState('');

  return (
    <>
      <div className='registerProfParentDiv'>
        <div className='registerProfCardDiv'>
          <div className='categoryDiv'>
            <div style={{ marginRight: '5rem' }}>Category</div>
            <div>List</div>
          </div>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontSize: '1rem', fontWeight: '800' }}>
                Summarize yourself, this is the title shown on your profile
              </Typography>
              {title.length < 10 && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
            </div>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: '100', color: 'grey' }}>
              Enter atleast 10 characters title
            </Typography>
            <div className='inputTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Title'
                autoComplete='true'
                fullWidth={true}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontWeight: '800' }}>Current Company</Typography>
            </div>
            <div className='inputTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Current Company ...'
                autoComplete='true'
                fullWidth={true}
                onChange={(event) => setCurrentCompany(event.target.value)}
              />
            </div>
            {currentCompany}
          </div>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontWeight: '800' }}>Years of Experience</Typography>
              {yearsOfExp.length === '' && (
                <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
              )}
            </div>
            <div className='numberTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Years of experience as an expert'
                autoComplete='true'
                type='number'
                fullWidth={true}
                onChange={(event) => setYearsOfExp(event.target.value)}
              />
            </div>
            {currentCompany}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAsProfessional;
