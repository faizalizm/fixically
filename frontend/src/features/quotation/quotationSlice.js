import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quotationService from './quotationService';

const initialState = {
  quotation: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a quotation
export const createQuotation = createAsyncThunk(
  'quotation/create',
  async (quotationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await quotationService.createQuotation(quotationData, token, role);
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

// Get quotation
export const getQuotation = createAsyncThunk(
  'quotation/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await quotationService.getQuotation(token, role);
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

// Find quotation
export const findQuotation = createAsyncThunk(
  'quotation/find',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await quotationService.findQuotation(id, token, role);
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

// Update quotation
export const updateQuotation = createAsyncThunk(
  'quotation/updateQuotation',
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await quotationService.updateQuotation(updateData, token, role);
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

// Delete an quotation
export const deleteQuotation = createAsyncThunk(
  'quotation/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotationService.deleteQuotation(id, token);
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

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quotation.push(action.payload);
      })
      .addCase(createQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quotation = action.payload;
      })
      .addCase(getQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quotation = action.payload;
      })
      .addCase(findQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.quotation = action.payload;
      })
      .addCase(updateQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quotation = state.quotation.filter(
          (quotation) => quotation._id !== action.payload.id
        );
      })
      .addCase(deleteQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = quotationSlice.actions;
export default quotationSlice.reducer;
