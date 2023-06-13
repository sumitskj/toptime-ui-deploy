/* eslint-disable no-undef */

export const validateEmail = (email) => {
  // RFC2822
  const emailRegEx =
    // eslint-disable-next-line max-len
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  return email.match(emailRegEx);
};

const apiHeaders = {};
apiHeaders['Content-Type'] = 'application/json';

export const fetchBackendApiWrapper = async (path, options, token = '') => {
  if (!options.headers) {
    options.headers = apiHeaders;
  }

  if (token) {
    apiHeaders['auth-token'] = token;
  }

  return await fetch(`${process.env.REACT_APP_BACKEND_API}${path}`, options);
};

export const fetchPaymentApiWrapper = async (path, options, token = '') => {
  if (!options.headers) {
    options.headers = apiHeaders;
  }

  if (token) {
    apiHeaders['auth-token'] = token;
  }

  return await fetch(`${process.env.REACT_APP_PAYMENT_API}${path}`, options);
};
