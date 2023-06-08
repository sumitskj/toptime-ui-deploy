import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../../utils/index';

const searchByCategory = createAsyncThunk('search/byCategory', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchWrapper(
      `/api/v1/professionals/searchByCategory?category=${arg.category}&page=${arg.page}`,
      {
        method: 'GET',
      },
    );
    if (!response.ok) {
      return rejectWithValue(response);
    }
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export { searchByCategory };
