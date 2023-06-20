import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../../utils';

const fetchProfessionalByCategory = createAsyncThunk(
  'getProfessional',
  async ({ professionalId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        `/api/v1/professionals/profile?id=${professionalId}`,
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

const updateProfessionalServiceStatus = createAsyncThunk(
  'updateProfessionalServiceStatus',
  async ({ professionalId, status }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        `/api/v1/professionals/updateStatus?registrationId=${professionalId}&status=${status}`,
        {
          method: 'PUT',
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

const updateProfessionalServiceProfile = createAsyncThunk(
  'updateProfessionalServiceProfile',
  async ({ body }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        '/api/v1/professionals/updateRegistration',
        {
          method: 'POST',
          body: JSON.stringify(body),
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

export {
  fetchProfessionalByCategory,
  updateProfessionalServiceStatus,
  updateProfessionalServiceProfile,
};
