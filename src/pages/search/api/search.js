import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../utils/index';

const searchByCategory = createAsyncThunk('search/byCategory', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchBackendApiWrapper(
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
