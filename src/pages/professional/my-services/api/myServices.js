import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../../utils';

const fetchMyServices = createAsyncThunk(
  'myServices',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        '/api/v1/professionals/services',
        {
          method: 'GET',
        },
        authToken,
      );
      if (!response.ok) {
        return rejectWithValue(response);
      }
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { fetchMyServices };
