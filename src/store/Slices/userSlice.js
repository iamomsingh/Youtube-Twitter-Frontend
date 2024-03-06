import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  profileData: null,
  history: [],
};

export const userChannelProfile = createAsyncThunk(
  "userChannelProfile",
  async (userName) => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/c/${userName}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const userWatchHistory = createAsyncThunk(
  "userWatchHistory",
  async () => {
    try {
      const response = await axiosInstance.get("/api/v1/users/history");
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userChannelProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(userWatchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(userWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      });
  },
});

export default userSlice.reducer;
