import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const CardMediaStyled = styled(CardMedia)`
  height: 280px;
  border-radius: 1rem;
  box-shadow: 0px 10px 10px 0px #888;
  filter: brightness(70%);
  object-fit: contain;
`;

const UserFeedCard = ({ data, navKey, category }) => {
  const handleOpenProfile = () => {
    window.open(
      `${window.location.origin}/user-profile/` + data.firstName + '-' + data[navKey],
      '_blank',
    );
  };
  return (
    <Box
      onClick={handleOpenProfile}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: '1.2rem',
        transition: 'all 0.2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
        width: { xs: 225, md: 275 },
      }}>
      <Card
        sx={{
          width: { xs: 225, md: 275 },
          minWidth: { xs: 225, md: 275 },
          display: 'inline-block',
          position: 'relative',
          minHeight: { xs: 280, md: 280 },
          maxHeight: { xs: 280, md: 280 },
          boxShadow: 'none',
          borderRadius: '1rem',
        }}>
        <CardMediaStyled title={`${data.firstName}`} image={data.profilePicUrl} />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            color: 'white',
            padding: '10px',
            borderRadius: '16px',
          }}>
          <Typography variant='h5' sx={{ fontSize: '0.8rem', fontWeight: '600', color: 'white' }}>
            {data.firstName} {data.lastName}
          </Typography>
          <Typography variant='body1' sx={{ fontSize: '0.8rem', color: 'white' }}>
            {category}
          </Typography>
        </Box>
      </Card>
      <Box
        sx={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxLines: '2',
        }}>
        <div>
          <Typography
            variant='caption'
            sx={{
              fontSize: '0.9rem',
              fontWeight: '400',
            }}>
            {data.designation}
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ ml: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
            {data.rating == 0 ? '-' : `${data.rating}`}
          </Typography>
          <StarIcon style={{ color: '#F7DE05' }} />
        </div>
      </Box>
    </Box>
  );
};

UserFeedCard.propTypes = {
  data: PropTypes.object,
  navKey: PropTypes.string,
  category: PropTypes.string,
};

UserFeedCard.defaultProps = {
  data: {},
  navKey: 'professionalId',
  category: '',
};

export default UserFeedCard;
