import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../../../utils/index';

const getAllFeedsHome = createAsyncThunk(
  'feeds/all',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        '/api/v1/home',
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

const getFeedsTrending = createAsyncThunk(
  'feeds/trending',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        '/api/v1/getTrendingProfessionals',
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

const getStaticData = createAsyncThunk(
  'feeds/staticData',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        '/api/v1/getStaticData',
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

const getFeedsRecommended = createAsyncThunk(
  'feeds/recommended',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        '/api/v1/getRecommendedProfessionals',
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

const getFeedsCategories = createAsyncThunk(
  'feeds/categories',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchWrapper(
        '/api/v1/categories',
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

export {
  getAllFeedsHome,
  getFeedsTrending,
  getStaticData,
  getFeedsRecommended,
  getFeedsCategories,
};
