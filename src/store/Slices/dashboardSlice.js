import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  channelStats: null,
  channelVideos: [],
};

export const getChannelStats = createAsyncThunk("getChannelStats", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/dashboard/stats");
    if (response.data?.success) {
      toast.success(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    toast.error("channel stats fetch unsuccessfull!!");
    throw error;
  }
});

export const getChannelVideos = createAsyncThunk(
  "getChannelVideos",
  async () => {
    try {
      const response = await axiosInstance.get("/api/v1/dashboard/videos");
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("channel videos fetched unsuccessfull!!");
      throw error;
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannelStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.channelStats = action.payload;
      })
      .addCase(getChannelVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.channelVideos = action.payload;
      });
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
