import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBackendApiWrapper } from '../../../../utils';

const uploadImages = createAsyncThunk(
  'uploadImages',
  async ({ file, category }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      console.log('at ', authToken);
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetchBackendApiWrapper(
        `/api/v1/document/uploadProfessionalDoc?type=profilepic&category=${category}`,
        {
          method: 'POST',
          body: formData,
          headers: {},
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

const onBoardProfessional = createAsyncThunk(
  'onBoard',
  async ({ body }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.authData.accessToken;
      const response = await fetchBackendApiWrapper(
        '/api/v1/professionals/onBoard',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
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

export { uploadImages, onBoardProfessional };
