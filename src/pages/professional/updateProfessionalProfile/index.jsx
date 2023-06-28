import './updateProfessionalProfile.css';
import { Typography, InputBase, CircularProgress, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import SocialBox from './socialBox';
import { openNotification } from '../../notifications/slice/notification';
import { uploadImages } from '../../user/registerAsProfessional/api/registerProfApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProfessionalCardSkeleton from '../../../components/skeleton/ProfessionalCardSkeleton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  fetchProfessionalByCategory,
  updateProfessionalServiceProfile,
  updateProfessionalServiceStatus,
} from './api/professionalData';
import { addInitSocialLink, addSocialLink, initSocialLinks } from './slice/socialLinksUpdateSlice';

const UpdateProfessionalProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const professionalId = params.get('professionalId');
  const [professionalData, setProfessionalData] = useState(null);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [yearsOfExp, setYearsOfExp] = useState(-1);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);
  const [videoCallRate, setVideoCallRate] = useState(-1);
  const [voiceCallRate, setVoiceCallRate] = useState(-1);
  const [socialLinks, setSocialLinks] = useState(() => []);
  const socialDataRedux = useSelector((state) => state.socialUpdate);
  const categoriesData = useSelector((state) => state.categories);

  const [profilePic, setProfilePic] = useState(() => null);
  const [newProfilePic, setNewProfilePic] = useState(() => null);
  const inputFile = useRef(null);

  const [error, setError] = useState(false);
  const [badRequestError, setBadRequestError] = useState(false);
  const [showLoader, setShowLoader] = useState(() => false);
  const [openTooltip, setOpenTooltip] = useState(() => false);

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        setShowLoader(true);
        console.log('ad ', params, professionalId);
        const professionalRes = await dispatch(
          fetchProfessionalByCategory({ professionalId: professionalId }),
        ).unwrap();
        console.log('s ', professionalRes);
        if (professionalRes.ok) {
          const professionalJson = await professionalRes.json();
          setProfessionalData(professionalJson);
          setCategory(professionalJson.category);
          setTitle(professionalJson.designation);
          setDescription(professionalJson.description);
          setCurrentCompany(professionalJson.company);
          setYearsOfExp(professionalJson.yearsExperience);
          setVideoCallRate(professionalJson.videoRate);
          setVoiceCallRate(professionalJson.voiceRate);
          setStatus(professionalJson.status);
          setProfilePic(professionalJson.profilePicUrl);
          dispatch(initSocialLinks());
          if (professionalJson.youTubeUrl !== '' && professionalJson.youTubeUrl !== null) {
            dispatch(
              addSocialLink({
                id: crypto.randomUUID(),
                value: 1,
                link: professionalJson.youTubeUrl,
              }),
            );
          }
          if (professionalJson.instagramUrl !== '' && professionalJson.instagramUrl !== null) {
            dispatch(
              addSocialLink({
                id: crypto.randomUUID(),
                value: 0,
                link: professionalJson.instagramUrl,
              }),
            );
          }
          if (professionalJson.githubUrl !== '' && professionalJson.githubUrl !== null) {
            dispatch(
              addSocialLink({
                id: crypto.randomUUID(),
                value: 3,
                link: professionalJson.githubUrl,
              }),
            );
          }
          if (professionalJson.linkedInUrl !== '' && professionalJson.linkedInUrl !== null) {
            dispatch(
              addSocialLink({
                id: crypto.randomUUID(),
                value: 2,
                link: professionalJson.linkedInUrl,
              }),
            );
          }
          if (professionalJson.otherUrl !== '' && professionalJson.otherUrl !== null) {
            dispatch(
              addSocialLink({
                id: crypto.randomUUID(),
                value: 4,
                link: professionalJson.otherUrl,
              }),
            );
          }
        }
      } catch (err) {
        if (err.status === 400) {
          setBadRequestError(true);
        } else {
          setError(true);
        }
        console.error('Error in loading professional profile: ', err);
      }
      setShowLoader(false);
    };
    fetchProfessionalData();
  }, []);

  const handleServiceUpdateStatus = async () => {
    try {
      setShowLoader(true);
      const resp = await dispatch(
        updateProfessionalServiceStatus({
          professionalId: professionalId,
          status: status !== 2 ? 2 : 0,
        }),
      ).unwrap();
      if (resp.ok) {
        console.log('updated status success');
        navigate(-1);
        dispatch(
          openNotification({
            severity: 'success',
            message: 'Successfully updated service!',
          }),
        );
      }
    } catch (err) {
      if (err.status === 400) {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Failed to update service due to bad request!',
          }),
        );
      } else {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Unable to updated service. Please try again!',
          }),
        );
      }
      console.error('updated status failed : ', err);
    }
    setShowLoader(false);
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const dataURLToBlob = (dataURL) => {
    var BASE64_MARKER = ';base64,';
    var parts, contentType, raw;
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      parts = dataURL.split(',');
      contentType = parts[0].split(':')[1];
      raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    parts = dataURL.split(BASE64_MARKER);
    contentType = parts[0].split(':')[1];
    raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const handleImageUpload = (event) => {
    console.log('file selected 1 ');
    if (event.target.files && event.target.files[0]) {
      console.log('file selected ', event.target.files[0]);
      const reader = new FileReader();
      reader.onload = function (readerEvent) {
        var image = new Image();
        image.onload = function () {
          // Resize the image
          var canvas = document.createElement('canvas'),
            maxSize = 544, // TODO : pull max size from a site config
            width = image.width,
            height = image.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/jpeg');
          console.log('processesd ', dataUrl);
          setNewProfilePic(dataURLToBlob(dataUrl));
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const checkFileSize = () => {
    if (newProfilePic.size / (1024 * 1024) > 15) {
      return false;
    }
    return true;
  };

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

  const findItemCategory = () => {
    const item = categoriesData.find((o) => o.id === Number.parseInt(category));
    if (item) return item.label;
    return '';
  };

  const addLink = () => {
    dispatch(addInitSocialLink());
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
    if (newProfilePic !== null && !checkFileSize()) {
      dispatch(
        openNotification({
          severity: 'error',
          message: 'Max image size can be 5MB',
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
      setShowLoader(true);
      let imageUrl = 'NA';
      if (newProfilePic !== null) {
        try {
          console.log('pr img ', newProfilePic);
          const uploadImgResp = await dispatch(
            uploadImages({ file: newProfilePic, category: category }),
          ).unwrap();
          if (uploadImgResp.ok) {
            const uploadImgJson = await uploadImgResp.json();
            console.log('Uploaded Images: ', JSON.stringify(uploadImgJson));
            imageUrl = uploadImgJson['url'];
          }
        } catch (err) {
          console.error('Error in updating image : ', err);
          dispatch(
            openNotification({
              severity: 'error',
              message: 'Something went wrong. Please try again.',
            }),
          );
          setShowLoader(false);
          return;
        }
      }
      try {
        const payload = {
          voiceRate: voiceCallRate,
          videoRate: videoCallRate,
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
          profilePicUrl: imageUrl,
          mobileNumber: '',
        };
        console.log('update profile payload: ', payload);
        const updateResp = await dispatch(
          updateProfessionalServiceProfile({ body: payload }),
        ).unwrap();
        if (updateResp.ok) {
          navigate(-1);
          dispatch(
            openNotification({
              severity: 'success',
              message: 'Successfully updated profile!',
            }),
          );
        }
      } catch (err) {
        console.error('Error in update profile : ', err);
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
      <div className='updateRegisterProfParentDiv'>
        {showLoader && <ProfessionalCardSkeleton />}
        {error && (
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Typography>Something went wrong. Please try refreshing page again.</Typography>
          </div>
        )}
        {badRequestError && (
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Typography>Bad Request: The professional you searched for does not exist</Typography>
          </div>
        )}
        {!showLoader && !error && !badRequestError && professionalData !== null && (
          <div className='updateRegisterProfCardDiv'>
            <div className='avatarDiv'>
              <div className='avatarTmp'>
                <img
                  src={
                    newProfilePic === null ? profilePic : URL.createObjectURL(newProfilePic)
                  }></img>
                <div onClick={onButtonClick} className='avatarText'>
                  <Typography sx={{ fontWeight: '600', fontSize: '0.8rem' }}>Update</Typography>
                </div>
                <input
                  type='file'
                  id='file'
                  accept='image/*'
                  ref={inputFile}
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className='updateCategoryDiv'>
              <div className='titleHeadDiv'>
                <Typography sx={{ fontWeight: '800', marginRight: '2rem' }}>Category</Typography>
                <div>{findItemCategory()}</div>
              </div>
              <div className='titleHeadDiv'>
                <Typography sx={{ fontWeight: '800', marginRight: '2rem' }}>Status</Typography>
                <div
                  style={{
                    color: 'white',
                    padding: '2px',
                    borderRadius: '2px',
                    backgroundColor: `${status !== 2 ? '#03C988' : '#FF2626'}`,
                  }}>
                  {status !== 2 ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
            <div className='copyProfileLinkDiv'>
              <Typography sx={{ fontWeight: '800', marginRight: '2rem' }}>
                Profile Share Link
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: '300', fontSize: '1rem' }}>
                  {window.location.host +
                    '/user-profile/' +
                    professionalData.firstName.replace(/ /g, '') +
                    '-' +
                    professionalId}
                </Typography>
                <Tooltip
                  open={openTooltip}
                  title='Copied'
                  onClose={() => {
                    setOpenTooltip(false);
                  }}
                  leaveDelay={500}>
                  <ContentCopyIcon
                    className='iconHover'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.host +
                          '/user-profile/' +
                          professionalData.firstName +
                          '-' +
                          professionalId,
                      );
                      setOpenTooltip(true);
                    }}
                    fontSize='1rem'
                    sx={{ ml: 1 }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='updateHeadingDiv'>
              <div className='updateErrorHeadingDiv'>
                <Typography sx={{ fontSize: '1rem', fontWeight: '800' }}>
                  Summarize yourself, this is the title shown on your profile
                </Typography>
                {title.length < 10 && <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>}
              </div>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: '300', color: 'grey' }}>
                Enter atleast 10 characters title
              </Typography>
              <div className='updateInputTextBox'>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Title'
                  autoComplete='true'
                  fullWidth={true}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
            </div>
            <div className='updateHeadingDiv'>
              <div className='updateErrorHeadingDiv'>
                <Typography sx={{ fontWeight: '800' }}>Where are you working currently</Typography>
              </div>
              <div className='updateInputTextBox'>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Current Company ...'
                  autoComplete='true'
                  fullWidth={true}
                  value={currentCompany}
                  onChange={(event) => setCurrentCompany(event.target.value)}
                />
              </div>
            </div>
            <div className='updateHeadingDiv'>
              <div className='updateErrorHeadingDiv'>
                <Typography sx={{ fontWeight: '800' }}>Years of Experience</Typography>
                {(yearsOfExp === -1 || isNaN(yearsOfExp)) && (
                  <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
                )}
              </div>
              <div className='updateNumberTextBox'>
                <InputBase
                  style={{ paddingRight: '1rem' }}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Years of experience in the field'
                  autoComplete='true'
                  type='number'
                  value={Number.parseInt(yearsOfExp)}
                  fullWidth={true}
                  onChange={(event) => setYearsOfExp(parseInt(event.target.value))}
                />
              </div>
            </div>
            <div className='updateHeadingDiv'>
              <div className='updateErrorHeadingDiv'>
                <Typography sx={{ fontSize: '1rem', fontWeight: '800' }}>
                  Describe yourself
                </Typography>
                {description.length < 50 && (
                  <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
                )}
              </div>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: '300', color: 'grey' }}>
                Enter atleast 50 characters description
              </Typography>
              <div className='updateInputTextBox'>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='About yourself.
                  With what skills you can help.
                  Your preferred booking time and booking duration which you are likely to accept'
                  autoComplete='true'
                  fullWidth={true}
                  value={description}
                  multiline={true}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
            <LineBar desc='Call Rates (₹)' />
            <Typography style={{ color: 'red', fontSize: '0.8rem' }}>
              10% will be platform fees
            </Typography>
            <div className='updateHeadingDiv'>
              <div className='updateErrorHeadingDiv'>
                <Typography sx={{ fontWeight: '800' }}>Video Call Rate</Typography>
                {(videoCallRate === -1 || isNaN(videoCallRate) || videoCallRate <= 0) && (
                  <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
                )}
              </div>
              <div className='updateNumberTextBox'>
                <InputBase
                  style={{ paddingRight: '1rem' }}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Video Call Rate in ₹'
                  autoComplete='true'
                  type='number'
                  value={videoCallRate}
                  fullWidth={true}
                  onChange={(event) => setVideoCallRate(parseInt(event.target.value))}
                />
              </div>
              {videoCallRate !== null && !isNaN(videoCallRate) && (
                <Typography sx={{ fontSize: '0.8rem', fontWeight: '300', color: 'green' }}>
                  For a video call of 10 min you will receive ₹{videoCallRate * 5 * 0.9}
                </Typography>
              )}
            </div>
            <div className='updateHeadingDiv'>
              <div className='updateErrorHeadingDiv'>
                <Typography sx={{ fontWeight: '800' }}>Voice Call Rate</Typography>
                {(voiceCallRate === -1 || isNaN(voiceCallRate) || voiceCallRate <= 0) && (
                  <ErrorIcon color='error' sx={{ ml: '1rem' }}></ErrorIcon>
                )}
              </div>
              <div className='updateNumberTextBox'>
                <InputBase
                  style={{ paddingRight: '1rem' }}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Video Call Rate in ₹'
                  autoComplete='true'
                  type='number'
                  value={voiceCallRate}
                  fullWidth={true}
                  onChange={(event) => setVoiceCallRate(parseInt(event.target.value))}
                />
              </div>
              {voiceCallRate !== null && !isNaN(voiceCallRate) && (
                <Typography sx={{ fontSize: '0.8rem', fontWeight: '300', color: 'green' }}>
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
            <div className='updateSaveBtn'>
              <button
                onClick={submitForm}
                style={{
                  border: '0',
                  borderRadius: '0',
                  padding: '12px',
                  color: 'white',
                  backgroundColor: '#FF9429',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                }}>
                {showLoader ? (
                  <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'white' }} />
                ) : (
                  'Save'
                )}
              </button>
            </div>
            <div style={{ marginTop: '1rem' }} className='updateSaveBtn'>
              <button
                onClick={handleServiceUpdateStatus}
                style={{
                  border: '0',
                  borderRadius: '0',
                  padding: '12px',
                  color: 'white',
                  backgroundColor: `${status !== 2 ? 'red' : '#03C988'}`,
                  fontSize: '1.2rem',
                  fontWeight: '600',
                }}>
                {showLoader ? (
                  <CircularProgress size='1rem' variant='indeterminate' sx={{ color: 'white' }} />
                ) : status !== 2 ? (
                  'Deactivate'
                ) : (
                  'Activate'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProfessionalProfile;
