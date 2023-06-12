import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../../../utils';

const confirmBooking = createAsyncThunk(
  'confirmBooking',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        '/api/v1/booking/confirmBooking',
        {
          method: 'PUT',
          body: JSON.stringify(payload),
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

export { confirmBooking };
