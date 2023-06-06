import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../../utils/index';

const getCategories = createAsyncThunk('category/getAll', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchWrapper('/api/v1/categories', {
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

export { getCategories };
