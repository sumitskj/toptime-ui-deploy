import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../../utils/index';

const getUserDetails = createAsyncThunk(
  'myProfile/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        '/api/v1/user/userDetails',
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

export { getUserDetails };
