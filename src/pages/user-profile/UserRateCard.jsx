import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Radio, TextField, InputAdornment, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoxStyled = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 0.7rem;
  box-shadow: 0 0 10px 3px #ddd;
`;

const SpanStyled = styled('span')`
  display: block;
`;

const CostLabels = styled(Typography)`
  width: 90%;
  text-decoration: underline;
  & span {
    float: right;
    font-weight: 600;
  }
`;

const TotalCostLabel = styled(Typography)`
  width: 90%;
  font-weight: 600;
  & span {
    float: right;
    font-weight: 600;
  }
`;

const UserRateCard = ({ userData }) => {
  const [selectedValue, setSelectedValue] = useState('audio');

  const [duration, setDuration] = useState(10);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  let callCost = 0;
  let platformCharge = 0;
  if (selectedValue === 'audio') {
    callCost = (duration * userData.voiceRate).toFixed(2);
    platformCharge = ((callCost * 10) / 100).toFixed(2);
  }

  if (selectedValue === 'video') {
    callCost = (duration * userData.videoRate).toFixed(2);
    platformCharge = ((callCost * 10) / 100).toFixed(2);
  }

  return (
    <BoxStyled m={2} p={2}>
      <Typography gutterBottom variant='h6'>
        Schedule meeting
      </Typography>
      <div>
        <SpanStyled>
          <Radio
            checked={selectedValue === 'audio'}
            onChange={handleChange}
            value='audio'
            name='call-type'
            inputProps={{ 'aria-label': 'Audio' }}
          />
          <label>Voice {userData.voiceRate} INR/Min</label>
        </SpanStyled>

        <SpanStyled>
          <Radio
            checked={selectedValue === 'video'}
            onChange={handleChange}
            value='video'
            name='call-type'
            inputProps={{ 'aria-label': 'Video' }}
          />
          <label>Video {userData.videoRate} INR/Min</label>
        </SpanStyled>
      </div>
      <TextField label='Date Time' id='date-time-picker' sx={{ m: 1, width: '90%' }} />
      <TextField
        label='Duration'
        id='outlined-start-adornment'
        type='number'
        sx={{ m: 1, width: '90%' }}
        InputProps={{
          endAdornment: <InputAdornment position='end'>min</InputAdornment>,
        }}
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <Button variant='contained' sx={{ margin: '8px', width: '90%' }}>
        Reserve
      </Button>
      <Divider sx={{ margin: '8px', width: '90%', color: '#444' }} />
      {/* cost calculation */}
      <CostLabels variant='subtitle2' gutterBottom>
        Call duration cost <span>{callCost} INR</span>
      </CostLabels>
      <CostLabels variant='subtitle2' gutterBottom>
        Platform cost (10% call duration cost) <span>{platformCharge} INR</span>
      </CostLabels>
      <Divider sx={{ margin: '8px', width: '90%', color: '#444' }} />

      <TotalCostLabel variant='subtitle1' gutterBottom>
        Total cost <span>{Number(callCost) + Number(platformCharge)} INR</span>
      </TotalCostLabel>
    </BoxStyled>
  );
};

UserRateCard.propTypes = {
  userData: PropTypes.objectOf({
    voiceRate: PropTypes.number,
    videoRate: PropTypes.number,
  }).isRequired,
};

export default UserRateCard;
