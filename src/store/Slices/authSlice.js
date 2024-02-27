import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  status: false,
  userData: null,
  accessToken: null,
};

export const createAccount = createAsyncThunk("register", async (data) => {
  try {
    const res = await axiosInstance.post("/users/register", data);
    console.log(res.data);
    toast.success(res.data.data.message);
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    toast.success(res.data.data.message);
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const res = await axiosInstance.post("/users/logout");
    toast.success(res.data.data.message);
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/change-password", data);
      toast.success(response.data.data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/current-user");
  return response.data.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload.data.user;
        state.loading = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = false;
        state.userData = null;
      });
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
