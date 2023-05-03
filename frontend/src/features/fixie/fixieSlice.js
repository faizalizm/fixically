import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fixieService from './fixieService';

const initialState = {
  fixie: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const searchFixie = createAsyncThunk(
  'fixie/searchFixie',
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

export const updateFixie = createAsyncThunk(
  'fixie/updateFixie',
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fixieService.updateFixie(updateData, token);
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
      })
      .addCase(updateFixie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFixie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fixie = action.payload;
      })
      .addCase(updateFixie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = fixieSlice.actions;
export default fixieSlice.reducer;
