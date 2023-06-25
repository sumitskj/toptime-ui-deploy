import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../utils/index';

const getFeedsTrending = createAsyncThunk('feeds/trending', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchBackendApiWrapper('/api/v1/getTrendingProfessionals', {
      method: 'GET',
    });
    if (!response.ok) {
      return rejectWithValue(response);
    }
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getStaticData = createAsyncThunk('feeds/trending', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchBackendApiWrapper('/api/v1/getStaticData', {
      method: 'GET',
    });
    if (!response.ok) {
      return rejectWithValue(response);
    }
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export { getFeedsTrending, getStaticData };
