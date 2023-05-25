import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Button,
  Box,
} from '@mui/material';
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
  width: 200px;
  border-radius: 50%;
  margin: auto;
  border: 4px solid #129fff;
`;

const UserFeedCard = ({ data }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: 345,
        display: 'inline-block',
        minHeight: 450,
        maxHeight: 450,
        margin: '1rem',
        background: '#dbf3ff',
        padding: '1rem 0',
        boxShadow: '4px 4px 10px 5px #ddd',
      }}
      key={data.userId}>
      <CardMediaStyled title={`${data.firstName}`} image={data.profilePicUrl} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {`${data.firstName} ${data.lastName}`}
        </Typography>
        <Typography gutterBottom variant='subtitle1' component='div'>
          {`${data.designation} at ${data.company}`}
        </Typography>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          {data.description}
        </Typography>
        <Box sx={{ width: '100%' }} pt={1} pb={1}>
          <ChipStyledProfile
            icon={<HandshakeIcon />}
            label={data.sessionsCompleted}
            variant='outlined'
          />
          <ChipStyledProfile icon={<StarIcon />} label={data.rating} variant='outlined' />
        </Box>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
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
