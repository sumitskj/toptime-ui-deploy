/* eslint-disable no-undef */

export const validateEmail = (email) => {
  // RFC2822
  const emailRegEx =
    // eslint-disable-next-line max-len
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  return email.match(emailRegEx);
};

const apiHeaders = new Headers();
apiHeaders.append('Content-Type', 'application/json');

export const fetchWrapper = (path, options) => {
  if (!options.headers) {
    options.headers = apiHeaders;
  }

  return fetch(`${process.env.REACT_APP_API}${path}`, options);
};
