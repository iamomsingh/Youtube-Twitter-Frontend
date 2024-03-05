import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  likedVideos: [],
};

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/likes/videos`);
    return response.data.data;
  } catch (error) {
    toast.error("Failed to change Like stats");
    throw error;
  }
});

export const toggleVideoLike = createAsyncThunk(
  "toggleVideoLike",
  async (videoId) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/likes/toggle/v/${videoId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error("Failed to change Like stats");
      throw error;
    }
  }
);

export const toggleTweetLike = createAsyncThunk(
  "toggleTweetLike",
  async (tweetId) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/likes/toggle/t/${tweetId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error("Failed to change Like stats");
      throw error;
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  "toggleCommentLike",
  async (commentId) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/likes/toggle/c/${commentId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error("Failed to change Like stats");
      throw error;
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideos = action.payload;
      });
  },
});

export const {} = likeSlice.actions;

export default likeSlice.reducer;
