import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  subscribed: null,
  channelSubscribers: [],
  mySubscriptions: [],
};

export const getUserChannelSubscribers = createAsyncThunk(
  "getUserChannelSubscribers",
  async (channelId) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/subscriptions/c/${channelId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error("Failed to get subscribers");
      throw error;
    }
  }
);

export const getSubscribedChannels = createAsyncThunk(
  "getSubscribedChannels",
  async (subscriberId) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/subscriptions/u/${subscriberId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error("Failed to get subscription");
      throw error;
    }
  }
);

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (channelId) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/subscriptions/c/${channelId}`
      );
      return response.data.data.subscribed;
    } catch (error) {
      toast.error("Failed to change stats");
      throw error;
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserChannelSubscribers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.channelSubscribers = action.payload;
      })
      .addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.mySubscriptions = action.payload.filter(
          (subscription) => subscription?.subscribedChannel?.latestVideo
        );
      })
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribed = action.payload;
      });
  },
});

export const {} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
