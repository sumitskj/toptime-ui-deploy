import { fetchBackendApiWrapper } from '../../../utils/index';

const getEmailOtp = async (email) => {
  const response = await fetchBackendApiWrapper(`/api/v1/auth/sendEmailOtp/${email}`, {
    method: 'POST',
  });
  return response;
};

const verifyOtp = async (payload) => {
  const response = await fetchBackendApiWrapper('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response;
};

const getProfessionalAppliedCategories = async (token) => {
  const response = await fetchBackendApiWrapper(
    '/api/v1/professionals/category',
    {
      method: 'GET',
    },
    token,
  );
  return response;
};

const getUserDetails = async (token) => {
  const response = await fetchBackendApiWrapper(
    '/api/v1/user/userDetails',
    {
      method: 'GET',
    },
    token,
  );
  return response;
};

const postUserDetails = async (payload, token) => {
  const response = await fetchBackendApiWrapper(
    '/api/v1/user/userDetails',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
    token,
  );
  return response;
};

const getRefreshToken = async (token) => {
  const response = await fetchBackendApiWrapper(
    '/api/v1/auth/refreshToken',
    {
      method: 'GET',
    },
    token,
  );
  return response;
};

export {
  getEmailOtp,
  verifyOtp,
  getProfessionalAppliedCategories,
  getUserDetails,
  postUserDetails,
  getRefreshToken,
};
