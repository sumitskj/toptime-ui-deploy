import { fetchWrapper } from '../../../utils/index';

const getEmailOtp = async (email) => {
  const response = await fetchWrapper(`/api/v1/auth/sendEmailOtp/${email}`, {
    method: 'POST',
  });
  return response;
};

const verifyOtp = async (payload) => {
  const response = await fetchWrapper('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response;
};

export { getEmailOtp, verifyOtp };
