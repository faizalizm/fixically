import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fixieService from './fixieService';

const initialState = {
  fixie: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all fixie
export const allFixie = createAsyncThunk(
  'fixie/all',
  async (status, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await fixieService.allFixie(status, token, role);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a fixie
export const profileFixie = createAsyncThunk(
  'fixie/profile',
  async (fixie_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await fixieService.profileFixie(fixie_id, token, role);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search fixies
export const searchFixie = createAsyncThunk(
  'fixie/search',
  async (searchData, thunkAPI) => {
    try {
      return await fixieService.searchFixie(searchData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fixieSlice = createSlice({
  name: 'fixie',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(allFixie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allFixie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fixie = action.payload;
      })
      .addCase(allFixie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(profileFixie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileFixie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fixie = action.payload;
      })
      .addCase(profileFixie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchFixie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFixie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fixie = action.payload;
      })
      .addCase(searchFixie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = fixieSlice.actions;
export default fixieSlice.reducer;
