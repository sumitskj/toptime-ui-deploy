import { fetchBackendApiWrapper } from '../../../../utils/index';

const getProfessionalBookings = async (query, token) => {
  const response = await fetchBackendApiWrapper(
    `/api/v1/booking/professional${query}`,
    {
      method: 'GET',
    },
    token,
  );
  return response;
};

export { getProfessionalBookings };
