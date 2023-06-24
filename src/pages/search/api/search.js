import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../utils/index';

const searchByCategory = createAsyncThunk('search/byCategory', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchBackendApiWrapper(
      `/api/v1/professionals/searchByCategory?category=${arg.category}&page=${arg.page}&limit=${arg.limit}`,
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

const searchByCategoryAndName = createAsyncThunk(
  'search/byCategoryAndName',
  async (arg, { rejectWithValue }) => {
    try {
      const query = `category=${arg.category}&searchQuery=${arg.name}&page=${arg.page}&limit=${arg.limit}`;
      const response = await fetchBackendApiWrapper(
        `/api/v1/professionals/searchNameWithCategory?${query}`,
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
  },
);

const searchByOnlyName = createAsyncThunk(
  'search/searchByOnlyName',
  async (arg, { rejectWithValue }) => {
    try {
      const query = `searchQuery=${arg.name}&page=${arg.page}`;
      const response = await fetchBackendApiWrapper(
        `/api/v1/professionals/search?${query}&limit=${arg.limit}`,
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
  },
);

export { searchByCategory, searchByCategoryAndName, searchByOnlyName };
