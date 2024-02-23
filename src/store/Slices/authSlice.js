import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  status: false,
  userData: null,
};

const createAccount = createAsyncThunk("user/register", async (data) => {
  try {
    const res = await axiosInstance.post("user/register", data);
    toast.success(res.data.data.message);
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

const userLogin = createAsyncThunk("users/login", async (data) => {
  try {
    const res = await axiosInstance.post("users/login", data);
    toast.success(res.data.data.message);
    return res.data.data;
  } catch (error) {}
});

const userLogout = createAsyncThunk("users/logout", async () => {
  try {
    const res = await axiosInstance.post("users/logout");
    toast.success(res.data.data.message);
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
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
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        (state.status = true), (state.userData = null);
      });
  },
});
