import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { Box, Card, CardMedia, Typography } from '@mui/material';

const CardMediaStyled = styled(CardMedia)`
  height: 280px;
  border-radius: 1rem;
  box-shadow: 0px 10px 10px 0px #888;
  filter: brightness(70%);
  object-fit: contain;
`;

const UserDetailCard = ({ data, navKey, category }) => {
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
        transition: 'all 0.2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}>
      <Card
        sx={{
          display: 'inline-block',
          position: 'relative',
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

UserDetailCard.propTypes = {
  data: PropTypes.object,
  navKey: PropTypes.string,
  category: PropTypes.string,
};

UserDetailCard.defaultProps = {
  data: {},
  navKey: 'professionalId',
  category: '',
};

export default UserDetailCard;
