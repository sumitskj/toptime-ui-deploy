import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const ChipStyledProfile = styled(Chip)`
  font-weight: 600;
  border: none;
  .MuiChip-icon {
    color: #00adff;
  }
`;

const CardMediaStyled = styled(CardMedia)`
  height: 280px;
  border-radius: 1rem;
  margin: 8px;
  box-shadow: 0px 10px 10px 0px #888;
`;

const CardContentStyled = styled(CardContent)`
  padding: 0.5rem;
  &:last-child {
    padding-bottom: 0.5rem;
  }
`;

const StyledName = styled(Typography)`
  display: flex;
  justify-content: space-between;
  .profile-link {
    text-decoration: none;
    color: #000000;
    font-size: 1rem;
  }
`;

const UserFeedCard = ({ data, navKey, category }) => {
  return (
    <Card
      sx={{
        width: 275,
        display: 'inline-block',
        minHeight: 400,
        maxHeight: 400,
        margin: '1rem',
        boxShadow: 'none',
      }}>
      <CardMediaStyled title={`${data.firstName}`} image={data.profilePicUrl} />
      <CardContentStyled sx={{ padding: '0.5rem' }}>
        <StyledName gutterBottom variant='h6' component='div'>
          <Link
            className='profile-link'
            to={`/user-profile/${data[navKey]}`}>{`${data.firstName} ${data.lastName}`}</Link>
          <ChipStyledProfile icon={<StarIcon />} label={data.rating} variant='outlined' />
        </StyledName>
        <Typography gutterBottom variant='caption' component='div'>
          {`${data.designation} at ${data.company || data.currentCompany}`}
        </Typography>
        <Typography gutterBottom variant='caption' component='div'>
          {category}
        </Typography>
      </CardContentStyled>
    </Card>
  );
};

UserFeedCard.propTypes = {
  data: PropTypes.objectOf({}),
  navKey: PropTypes.string,
  category: PropTypes.string,
};

UserFeedCard.defaultProps = {
  data: {},
  navKey: 'professionalId',
  category: '',
};

export default UserFeedCard;
