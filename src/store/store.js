import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
