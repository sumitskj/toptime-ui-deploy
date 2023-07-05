import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeSocialLink, updateSocialLink } from './slice/socialLinksSlice';
import { Typography, InputBase, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// social links box
const SocialBox = ({ payload }) => {
  const dispatch = useDispatch();
  const [socialData, setSocialData] = useState(payload);

  const handleListSelect = (event) => {
    let nData = JSON.parse(JSON.stringify(socialData));
    nData.value = event.target.value;
    setSocialData(nData);
  };
  const handleLinkUpdate = (event) => {
    let nData = JSON.parse(JSON.stringify(socialData));
    nData.link = event.target.value;
    setSocialData(nData);
  };

  const handleRemove = () => {
    dispatch(removeSocialLink(socialData));
  };

  useEffect(() => {
    dispatch(updateSocialLink(socialData));
  }, [socialData]);

  const checkUrl = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('www.'))
      return true;
    return false;
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          width: '90%',
          marginTop: '1rem',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
            width: '90%',
            border: '1px solid grey',
            borderRadius: '8px',
          }}>
          <select
            name='socialPlatforms'
            id='socialPlatforms'
            value={socialData.value}
            onChange={handleListSelect}
            style={{
              position: 'relative',
              height: '40px',
              border: '0',
              borderRight: '1px solid grey',
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            }}>
            <option value={0}>Instagram</option>
            <option value={1}>Youtube</option>
            <option value={2}>LinkedIn</option>
            <option value={3}>Github</option>
            <option value={4}>Other</option>
          </select>
          <div style={{ position: 'relative', width: '60%', marginLeft: '1rem' }}>
            <InputBase
              sx={{ flex: 1 }}
              placeholder='Add social url'
              autoComplete='true'
              fullWidth={true}
              value={socialData.link}
              onChange={handleLinkUpdate}
            />
          </div>
        </div>
        <IconButton
          size='small'
          onClick={handleRemove}
          style={{ backgroundColor: 'red', borderRadius: '10px' }}>
          <DeleteForeverIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
      {!checkUrl(socialData.link) && (
        <Typography
          style={{ color: 'red', fontSize: '0.8rem', position: 'relative', width: '90%' }}>
          Enter valid link
        </Typography>
      )}
    </>
  );
};

SocialBox.propTypes = {
  payload: PropTypes.object.isRequired,
};

export default SocialBox;
