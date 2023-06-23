import React from 'react';
import LOGO_WITH_NAME from '../../static/images/1048x1000-nobg.png';
import LOGO from '../../static/images/512x512-nobg.png';

const LogoWithName = () => {
  return <img alt='logo-toptime' src={LOGO_WITH_NAME} height={64} />;
};

const Logo = () => {
  return <img alt='logo-toptime' src={LOGO} height={24} />;
};

export { LogoWithName, Logo };
