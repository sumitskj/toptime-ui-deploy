import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper, fetchPaymentApiWrapper } from '../../../../utils';

const confirmBooking = createAsyncThunk(
  'confirmBooking',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
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

const cancelBooking = createAsyncThunk(
  'cancelBooking',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchPaymentApiWrapper(
        '/api/v1/payment/transaction/cancelCall',
        {
          method: 'POST',
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

const rescheduleBooking = createAsyncThunk(
  'rescheduleBooking',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        '/api/v1/booking/rescheduleBooking',
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

const submitFeedback = createAsyncThunk(
  'submitFeedback',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        '/api/v1/booking/addCallFeedback',
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

const raiseIssueApi = createAsyncThunk(
  'raiseIssue',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchPaymentApiWrapper(
        '/api/v1/complain/booking',
        {
          method: 'POST',
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

export { confirmBooking, cancelBooking, rescheduleBooking, submitFeedback, raiseIssueApi };
