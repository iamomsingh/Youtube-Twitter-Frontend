import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  tweets: [],
};
console.log(initialState.tweets);
export const createTweet = createAsyncThunk("createTweet", async (content) => {
  try {
    const response = await axiosInstance.post("/api/v1/tweet", content);
    if (response.data?.success) {
      toast.success(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    toast.error("tweet created unsuccessfull!!");
    throw error;
  }
});

export const editTweet = createAsyncThunk(
  "editTweet",
  async ({ tweetId, content }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/tweet/${tweetId}`,
        content
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("tweet updated unsuccessfull!!");
      throw error;
    }
  }
);

export const deleteTweet = createAsyncThunk(
  "deleteTweet",
  async ({ tweetId }) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/tweet/${tweetId}`);
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("Failed to delete tweet");
      throw error;
    }
  }
);

export const getUserTweets = createAsyncThunk(
  "getUserTweets",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/tweet/user/${userId}`);
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("Failed to fetch user tweet");
      throw error;
    }
  }
);

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.unshift(action.payload);
      })
      .addCase(getUserTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.filter(
          (tweet) => tweet._id !== action.payload
        );
      });
  },
});

export const { addTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
