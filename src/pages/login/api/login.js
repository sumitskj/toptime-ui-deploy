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

export { getEmailOtp, verifyOtp, getProfessionalAppliedCategories };
