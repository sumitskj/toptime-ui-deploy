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
    color: #00adff;
  }
`;

const UserSocialLinks = ({ userData }) => {
  return (
    <Box p={1}>
      {userData.instagramUrl && (
        <IconButtonStyled size='large'>
          <InstagramIcon />
        </IconButtonStyled>
      )}
      {userData.linkedInUrl && (
        <IconButtonStyled size='large'>
          <LinkedInIcon />
        </IconButtonStyled>
      )}
      {userData.youTubeUrl && (
        <IconButtonStyled size='large'>
          <YouTubeIcon />
        </IconButtonStyled>
      )}
      {userData.githubUrl && (
        <IconButtonStyled size='large'>
          <GitHubIcon />
        </IconButtonStyled>
      )}
      {userData.otherUrl && (
        <IconButtonStyled size='large'>
          <LinkIcon />
        </IconButtonStyled>
      )}
    </Box>
  );
};

UserSocialLinks.propTypes = {
  userData: PropTypes.objectOf({
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
