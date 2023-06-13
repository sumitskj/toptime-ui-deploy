import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../utils/index';

const getProfessionalProfile = createAsyncThunk(
  'professional/profile',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        `/api/v1/professionals/profile${arg}`,
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

export { getProfessionalProfile };
