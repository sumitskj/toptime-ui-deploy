import {
  Typography,
  InputBase,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import './registerAsProfessional.css';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import { storeAppliedProfessionalCategories } from '../../../utils/loginStore';
import { getProfessionalAppliedCategories } from '../../login/api/login';
import { setAlreadyAppliedCategories } from '../../login/slice/login';
import SocialBox from './socialData';
import { addSocialLink } from './slice/socialLinksSlice';
import { openNotification } from '../../notifications/slice/notification';
import { onBoardProfessional, uploadImages } from './api/registerProfApi';
import { getUserDetails } from '../../my-profile/api/myProfile';
import { useNavigate } from 'react-router-dom';

const RegisterAsProfessional = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [yearsOfExp, setYearsOfExp] = useState(-1);
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [videoCallRate, setVideoCallRate] = useState(-1);
  const [voiceCallRate, setVoiceCallRate] = useState(-1);
  const categoriesData = useSelector((state) => state.categories);
  const authData = useSelector((state) => state.auth);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [socialLinks, setSocialLinks] = useState(() => []);
  const socialDataRedux = useSelector((state) => state.social);

  const [profilePic, setProfilePic] = useState(() => null);
  const inputFile = useRef(null);

  const [showLoader, setShowLoader] = useState(() => false);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleImageUpload = (event) => {
    console.log('file selected 1 ');
    if (event.target.files && event.target.files[0]) {
      console.log('file selected ', event.target.files[0]);
      setProfilePic(event.target.files[0]);
    }
  };

  const checkFileSize = () => {
    if (profilePic.size / (1024 * 1024) > 5) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchAlreadyAppliedCategories = async () => {
      try {
        const alreadyAppliedCategoriesResp = await getProfessionalAppliedCategories(
          authData.authData.accessToken,
        );
        if (alreadyAppliedCategoriesResp.ok) {
          const alreadyAppliedCategoriesRespJson = await alreadyAppliedCategoriesResp.json();
          console.log('Already applied categoires:: ', alreadyAppliedCategoriesRespJson);
          storeAppliedProfessionalCategories(alreadyAppliedCategoriesRespJson);
          dispatch(setAlreadyAppliedCategories(alreadyAppliedCategoriesRespJson['categories']));

          const tmp = [];
          for (
            let i = 0;
            i < categoriesData.length && alreadyAppliedCategoriesRespJson['categories'] !== null;
            i++
          ) {
            if (
              !alreadyAppliedCategoriesRespJson['categories'].includes(
                categoriesData[i].id.toString(),
              )
            ) {
              tmp.push(categoriesData[i]);
            }
          }
          setCategoriesOptions(tmp);
          console.log('Availble categories : ', tmp);
        }
      } catch (error) {
        console.log('Error in fetching already Applied Categories: ', error);
      }
    };

    fetchAlreadyAppliedCategories();

    const fetchMyProfile = async () => {
      try {
        const resp = await dispatch(getUserDetails()).unwrap();
        if (resp.ok) {
          const resJson = await resp.json();
          if (resJson['mobileNumber'] !== null && resJson['mobileNumber'].length === 10) {
            setMobile(resJson['mobileNumber']);
          }
        }
      } catch (error) {
        console.log('Error:: fetch My Profile::: ', error);
      }
    };
    fetchMyProfile();
  }, []);

  useEffect(() => {
    setSocialLinks(socialDataRedux.links);
  }, [socialDataRedux.links]);

  const LineBar = ({ desc }) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <hr
          style={{
            margin: '1rem 0rem',
            backgroundColor: '#C5C5C5',
            height: '1px',
            border: '0',
            position: 'relative',
            width: '40%',
          }}
        />
        <p style={{ color: '#C5C5C5', textAlign: 'center' }}>{desc}</p>
        <hr
          style={{
            margin: '1rem 0rem',
            backgroundColor: '#C5C5C5',
            height: '1px',
            border: '0',
            position: 'relative',
            width: '40%',
          }}
        />
      </div>
    );
  };
  LineBar.propTypes = {
    desc: PropTypes.string.isRequired,
  };

  const addLink = () => {
    dispatch(addSocialLink());
  };

  const checkUrl = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('www.'))
      return true;
    return false;
  };

  const checkSocialUrls = () => {
    let c = true;
    socialLinks.every((a) => {
      if (!checkUrl(a.link)) {
        c = false;
        return false;
      }
      return true;
    });
    return c;
  };

  const verifyForm = () => {
    if (
      category.length === 0 ||
      title.length < 10 ||
      yearsOfExp === -1 ||
      isNaN(yearsOfExp) ||
      description.length < 50 ||
      videoCallRate === null ||
      isNaN(videoCallRate) ||
      voiceCallRate === null ||
      isNaN(voiceCallRate) ||
      profilePic === null ||
      !checkFileSize() ||
      !checkSocialUrls()
    ) {
      dispatch(
        openNotification({
          severity: 'error',
          message: 'Please fill all the mandatory details correctly',
        }),
      );
      return false;
    }
    return true;
  };

  const findSocial = (query) => {
    let item = socialLinks.find((o) => o.value === query);
    if (item) {
      return item.link;
    }
    return '';
  };

  const submitForm = async () => {
    if (showLoader) {
      return;
    }
    if (verifyForm()) {
      try {
        setShowLoader(true);
        const uploadImgResp = await dispatch(
          uploadImages({ file: profilePic, category: category }),
        ).unwrap();
        if (uploadImgResp.ok) {
          const uploadImgJson = await uploadImgResp.json();
          console.log('Uploaded Images: ', JSON.stringify(uploadImgJson));
          const imagesUrl = uploadImgJson['url'];
          const payload = {
            voiceRate: voiceCallRate,
            videoRate: videoCallRate,
            mobileNumber: mobile,
            description: description,
            category: category,
            designation: title,
            company: currentCompany,
            yearsExperience: yearsOfExp,
            linkedInUrl: findSocial(2),
            youTubeUrl: findSocial(1),
            instagramUrl: findSocial(0),
            githubUrl: findSocial(3),
            otherUrl: findSocial(4),
            profilePicUrl: imagesUrl,
          };
          console.log('register payload: ', payload);
          const onboardResp = await dispatch(onBoardProfessional({ body: payload })).unwrap();
          if (onboardResp.ok) {
            navigate('/');
            dispatch(
              openNotification({
                severity: 'success',
                message: 'Successfully registered!',
              }),
            );
          }
        }
      } catch (err) {
        console.error('Error in onboard : ', err);
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Something went wrong. Please try again.',
          }),
        );
      }
      setShowLoader(false);
    }
  };

  return (
    <>
      <div className='registerProfParentDiv'>
        <div className='registerProfCardDiv'>
          <div className='categoryDiv'>
            <div style={{ marginRight: '2rem', display: 'flex' }}>
              <Typography sx={{ fontWeight: '800' }}>Category</Typography>
              {category.length === 0 && <ErrorIcon color='error'></ErrorIcon>}
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='demo-simple-select-helper-label'>Category</InputLabel>
                {categoriesOptions.length !== 0 && (
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={category}
                    defaultValue={categoriesOptions[0].id}
                    label='Category'
                    onChange={(event) => setCategory(event.target.value)}>
                    {categoriesOptions.map((ctg) => (
                      <MenuItem key={ctg.id} value={ctg.id}>
                        {ctg.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </div>
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
            {mobile.length === 0 && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
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
              <Typography sx={{ fontWeight: '800' }}>Where are you working currently</Typography>
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
              <Typography sx={{ fontWeight: '800' }}>Mobile Number</Typography>
            </div>
            <div className='inputTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder=''
                autoComplete='true'
                fullWidth={true}
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </div>
          </div>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontWeight: '800' }}>Years of Experience</Typography>
              {(yearsOfExp === -1 || isNaN(yearsOfExp)) && (
                <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
              )}
            </div>
            <div className='numberTextBox'>
              <InputBase
                style={{ paddingRight: '1rem' }}
                sx={{ ml: 1, flex: 1 }}
                placeholder='Years of experience in the field'
                autoComplete='true'
                type='number'
                fullWidth={true}
                onChange={(event) => setYearsOfExp(parseInt(event.target.value))}
              />
            </div>
          </div>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontSize: '1rem', fontWeight: '800' }}>
                Describe yourself
              </Typography>
              {description.length < 50 && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
            </div>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: '100', color: 'grey' }}>
              Enter atleast 50 characters description
            </Typography>
            <div className='inputTextBox'>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='About yourself.
                With what skills you can help.
                Your preferred booking time and booking duration which you are likely to accept'
                autoComplete='true'
                fullWidth={true}
                multiline={true}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <LineBar desc='Profile Pic' />
          <div className='picParentDiv'>
            <Typography style={{ color: 'red', fontSize: '0.8rem' }}>
              Max allowed file size: 5MB
            </Typography>
            <Typography style={{ color: 'red', fontSize: '0.8rem' }}>
              Fles supported: jpg, jpeg, png
            </Typography>
            <div className='picDiv'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: '800' }}>Profile Pic</Typography>
                {(profilePic === null || !checkFileSize()) && (
                  <ErrorIcon color='error' sx={{ marginLeft: '1rem' }}></ErrorIcon>
                )}
                <input
                  type='file'
                  id='file'
                  accept='image/*'
                  ref={inputFile}
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <Button
                  style={{
                    marginLeft: '1rem',
                    color: 'white',
                    border: '0',
                    borderRadius: '0',
                    backgroundColor: 'black',
                  }}
                  onClick={onButtonClick}>
                  Select image
                </Button>
              </div>
              {profilePic !== null && (
                <div>
                  <img
                    style={{
                      height: '100px',
                      filter: 'brightness(70%)',
                      objectFit: 'contain',
                      borderRadius: '10px',
                    }}
                    src={URL.createObjectURL(profilePic)}
                    alt=''
                  />
                </div>
              )}
            </div>
          </div>
          <LineBar desc='Call Rates (₹)' />
          <Typography style={{ color: 'red', fontSize: '0.8rem' }}>
            10% will be platform fees
          </Typography>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontWeight: '800' }}>Video Call Rate</Typography>
              {(videoCallRate === -1 || isNaN(videoCallRate) || videoCallRate <= 0) && (
                <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
              )}
            </div>
            <div className='numberTextBox'>
              <InputBase
                style={{ paddingRight: '1rem' }}
                sx={{ ml: 1, flex: 1 }}
                placeholder='Video Call Rate in ₹'
                autoComplete='true'
                type='number'
                fullWidth={true}
                onChange={(event) => setVideoCallRate(parseInt(event.target.value))}
              />
            </div>
            {videoCallRate !== null && !isNaN(videoCallRate) && (
              <Typography sx={{ fontSize: '0.8rem', fontWeight: '100', color: 'green' }}>
                For a video call of 10 min you will receive ₹{videoCallRate * 5 * 0.9}
              </Typography>
            )}
          </div>
          <div className='headingDiv'>
            <div className='errorHeadingDiv'>
              <Typography sx={{ fontWeight: '800' }}>Voice Call Rate</Typography>
              {(voiceCallRate === -1 || isNaN(voiceCallRate) || voiceCallRate <= 0) && (
                <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
              )}
            </div>
            <div className='numberTextBox'>
              <InputBase
                style={{ paddingRight: '1rem' }}
                sx={{ ml: 1, flex: 1 }}
                placeholder='Video Call Rate in ₹'
                autoComplete='true'
                type='number'
                fullWidth={true}
                onChange={(event) => setVoiceCallRate(parseInt(event.target.value))}
              />
            </div>
            {voiceCallRate !== null && !isNaN(voiceCallRate) && (
              <Typography sx={{ fontSize: '0.8rem', fontWeight: '100', color: 'green' }}>
                For a voice call of 10 min you will receive ₹{voiceCallRate * 5 * 0.9}
              </Typography>
            )}
          </div>
          <LineBar desc='Social Links' />
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: '1rem',
            }}>
            {socialLinks.map((social) => (
              <SocialBox key={social.id} payload={social} />
            ))}
            <button
              onClick={addLink}
              style={{
                border: '1px dotted grey',
                color: 'black',
                padding: '8px',
                borderRadius: '8px',
                marginTop: '1rem',
                fontSize: '0.9rem',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
              }}>
              + Add social link
            </button>
          </div>
          {/* {JSON.stringify(socialLinks)} */}
          <div className='saveBtn'>
            <button
              onClick={submitForm}
              style={{
                border: '0',
                borderRadius: '0',
                padding: '12px',
                color: 'white',
                backgroundColor: 'black',
                fontSize: '1.2rem',
                fontWeight: '600',
              }}>
              {showLoader ? (
                <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'white' }} />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAsProfessional;
