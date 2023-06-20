import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPaymentApiWrapper } from '../../../../utils';

const fetchRaisedIssues = createAsyncThunk(
  'fetchRaisedIssues',
  async ({ page, limit }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchPaymentApiWrapper(
        `/api/v1/complain/booking/all?page=${page}&limit=${limit}`,
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

export { fetchRaisedIssues };
