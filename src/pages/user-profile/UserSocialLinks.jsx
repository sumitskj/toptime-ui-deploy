import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

const IconButtonStyled = styled(IconButton)`
  &:hover {
    background: #00adff;
    .MuiSvgIcon-root {
      color: #444;
    }
  }
  .MuiSvgIcon-root {
    color: black;
  }
`;

const UserSocialLinks = ({ userData }) => {
  return (
    <Box p={1}>
      {userData.instagramUrl && (
        <IconButtonStyled onClick={() => window.open(userData.instagramUrl, '_blank')} size='large'>
          <InstagramIcon />
        </IconButtonStyled>
      )}
      {userData.linkedInUrl && (
        <IconButtonStyled onClick={() => window.open(userData.linkedInUrl, '_blank')} size='large'>
          <LinkedInIcon />
        </IconButtonStyled>
      )}
      {userData.youTubeUrl && (
        <IconButtonStyled onClick={() => window.open(userData.youTubeUrl, '_blank')} size='large'>
          <YouTubeIcon />
        </IconButtonStyled>
      )}
      {userData.githubUrl && (
        <IconButtonStyled onClick={() => window.open(userData.githubUrl, '_blank')} size='large'>
          <GitHubIcon />
        </IconButtonStyled>
      )}
      {userData.otherUrl && (
        <IconButtonStyled onClick={() => window.open(userData.otherUrl, '_blank')} size='large'>
          <LinkIcon />
        </IconButtonStyled>
      )}
    </Box>
  );
};

UserSocialLinks.propTypes = {
  userData: PropTypes.shape({
    instagramUrl: PropTypes.string,
    linkedInUrl: PropTypes.string,
    youTubeUrl: PropTypes.string,
    githubUrl: PropTypes.string,
    otherUrl: PropTypes.string,
  }),
};
UserSocialLinks.defaultProps = {
  userData: {
    instagramUrl: '',
    linkedInUrl: '',
    youTubeUrl: '',
    githubUrl: '',
    otherUrl: '',
  },
};

export default UserSocialLinks;
