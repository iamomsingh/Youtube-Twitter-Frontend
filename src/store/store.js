import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import userSliceReducer from "./Slices/userSlice.js";
import videoSliceReducer from "./Slices/videoSlice.js";
import commentSliceReducer from "./Slices/commentSlice.js";
import dashboardSliceReducer from "./Slices/dashboardSlice.js";
import likeSliceReducer from "./Slices/dashboardSlice.js";
import playlistSliceReducer from "./Slices/playlistSlice.js";
import subscriptionSliceReducer from "./Slices/subscriptionSlice.js";
import tweetSliceReducer from "./Slices/tweetSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    video: videoSliceReducer,
    comment: commentSliceReducer,
    dashboard: dashboardSliceReducer,
    like: likeSliceReducer,
    playlist: playlistSliceReducer,
    subscription: subscriptionSliceReducer,
    tweet: tweetSliceReducer,
  },
});

export default store;
