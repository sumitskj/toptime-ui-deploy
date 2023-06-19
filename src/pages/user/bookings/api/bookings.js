import { fetchBackendApiWrapper } from '../../../../utils/index';

const getUserBookings = async (query, token) => {
  const response = await fetchBackendApiWrapper(
    `/api/v1/booking/user${query}`,
    {
      method: 'GET',
    },
    token,
  );
  return response;
};

export { getUserBookings };
