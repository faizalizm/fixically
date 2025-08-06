import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import memberService from './memberService';

const initialState = {
  member: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all member
export const allMember = createAsyncThunk('member/all', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const role = thunkAPI.getState().auth.user.role;
    return await memberService.allMember(token, role);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get a member
export const profileMember = createAsyncThunk(
  'member/profile',
  async (member_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const role = thunkAPI.getState().auth.user.role;
      return await memberService.profileMember(member_id, token, role);
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

// Search members
export const searchMember = createAsyncThunk(
  'member/search',
  async (searchData, thunkAPI) => {
    try {
      return await memberService.searchMember(searchData);
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

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(allMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(allMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(profileMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(profileMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(searchMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memberSlice.actions;
export default memberSlice.reducer;
