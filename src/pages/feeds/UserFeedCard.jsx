import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Chip, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HandshakeIcon from '@mui/icons-material/Handshake';
import StarIcon from '@mui/icons-material/Star';

const ChipStyledProfile = styled(Chip)`
  font-weight: 600;
  border: none;
  .MuiChip-icon {
    color: #00adff;
  }
`;

const CardMediaStyled = styled(CardMedia)`
  height: 200px;
  border-radius: 4px;
  margin: auto;
`;

const CardContentStyled = styled(CardContent)`
  padding: 0.5rem;
  &:last-child {
    padding-bottom: 0.5rem;
  }
`;

const UserFeedCard = ({ data }) => {
  const navigate = useNavigate();
  const gotoProfessional = () => {
    navigate(`/user-profile/${data.professionalId}`);
  };

  return (
    <Card
      sx={{
        width: 275,
        display: 'inline-block',
        minHeight: 372,
        maxHeight: 372,
        margin: '1rem',
        background: '#dbf3ff',
        boxShadow: '4px 4px 10px 5px #ddd',
      }}>
      <CardMediaStyled title={`${data.firstName}`} image={data.profilePicUrl} />
      <CardContentStyled sx={{ padding: '0.5rem' }}>
        <Typography gutterBottom variant='h6' component='div'>
          {`${data.firstName} ${data.lastName}`}
        </Typography>
        <Typography gutterBottom variant='caption' component='div'>
          {`${data.designation} at ${data.company}`}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ height: '40px', maxHeight: '40px', textOverflow: 'ellipsis' }}
          gutterBottom>
          {data.description}
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} pt={1} pb={1}>
          <span>
            <ChipStyledProfile
              icon={<HandshakeIcon />}
              label={data.sessionsCompleted}
              variant='outlined'
            />
            <ChipStyledProfile icon={<StarIcon />} label={data.rating} variant='outlined' />
          </span>
          <Button
            size='small'
            variant='contained'
            sx={{ minWidth: '110px' }}
            onClick={gotoProfessional}>
            Learn More
          </Button>
        </Box>
      </CardContentStyled>
      {/* <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

UserFeedCard.propTypes = {
  data: PropTypes.objectOf({}),
};

UserFeedCard.defaultProps = {
  data: {},
};

export default UserFeedCard;
