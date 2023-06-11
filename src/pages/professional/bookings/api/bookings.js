import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../../../utils/index';

const getProfessionalBookings = createAsyncThunk(
  'bookings/professional',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        `/api/v1/booking/professional${arg}`,
        {
          method: 'GET',
        },
        authToken,
      );
      if (!response.ok) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { getProfessionalBookings };
