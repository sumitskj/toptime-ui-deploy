import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../utils/index';

const getProfessionalProfile = createAsyncThunk(
  'professional/profile',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetchBackendApiWrapper(`/api/v1/professionals/profile${arg}`, {
        method: 'GET',
      });
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
