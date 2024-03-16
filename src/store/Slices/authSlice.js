import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
  loading: false,
  status: false,
  userData: null,
};

export const createAccount = createAsyncThunk("register", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar[0]);
  formData.append("userName", data.userName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);

  try {
    const response = await axiosInstance.post(
      "/api/v1/users/register",
      formData
    );
    console.log(response.data);
    toast.success("Registered successfully!!!");
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post(`/api/v1/users/login`, data);
    // console.log(response.data.data.user);
    if (response.data?.success) {
      toast.success(response.data.message);
    }
    return response.data.data.user;
  } catch (error) {
    // console.log(error?.response?.data);
    toast.error("Login Unsuccessfull!!");
    throw error;
  }
});

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/api/v1/users/logout");
    if (response.data?.success) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error("Logout unsuccessfull.");
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/users/refresh-token",
        data
      );
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
      const response = await axiosInstance.post(
        "/api/v1/users/change-password",
        data
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/users/current-user`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error);
  }
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/users/update-avatar",
      avatar
    );
    if (response.data?.success) {
      toast.success(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const updateCoverImg = createAsyncThunk(
  "updateCoverImg",
  async (coverImage) => {
    try {
      const response = await axiosInstance.patch(
        "/api/v1/users/update-cover-image",
        coverImage
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async (data) => {
    try {
      const response = await axiosInstance.patch(
        "/api/v1/users/update-user",
        data
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(updateAvatar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCoverImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoverImg.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImg.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
  },
});

// export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
