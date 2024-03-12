import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  publishToggled: false,
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
      const url = new URL(`${BASE_URL}/api/v1/video`);

      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await axiosInstance.get(url);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      toast.error("video fetched unsuccessfull..");
      throw error;
    }
  }
);

export const getVideoById = createAsyncThunk(
  "getVideoById",
  async (videoId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/video/${videoId}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      toast.error("Failed to fetch video!");
      throw error;
    }
  }
);

export const publishAvideo = createAsyncThunk("publishAvideo", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("videoFile", data.videoFile[0]);
  formData.append("thumbnail", data.thumbnail[0]);

  try {
    const response = await axiosInstance.post("/api/v1/video", formData);
    toast.success(response?.data?.message);
    return response.data?.data;
  } catch (error) {
    toast.error("Failed to publish video");
    throw error;
  }
});

export const updateAVideo = createAsyncThunk(
  "updateAVideo",
  async ({ videoId, data }) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);
    try {
      const response = await axiosInstance.patch(
        `/api/v1/video/${videoId}`,
        formData
      );
      toast.success(response?.data?.message);
      return response.data?.data;
    } catch (error) {
      toast.error("Failed to edit video");
      throw error;
    }
  }
);

export const deleteAVideo = createAsyncThunk(
  "deleteAVideo",
  async (videoId) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/video/${videoId}`);
      toast.success(response?.data?.message);
      return response.data?.data;
    } catch (error) {
      toast.error("Failed to delete video");
      throw error;
    }
  }
);

export const togglePublishedStatus = createAsyncThunk(
  "togglePublishStatus",
  async (videoId) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/video/toggle/publish/${videoId}`
      );
      toast.success(response?.data?.message);
      return response.data?.data.isPublished;
    } catch (error) {
      toast.error("video stats unsuccessfull");
      throw error;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.docs = [...state.videos.docs, ...action.payload.docs];
        state.videos.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(publishAvideo.pending, (state) => {
        state.uploading = true;
      })
      .addCase(publishAvideo.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploaded = true;
      })
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(updateAVideo.pending, (state) => {
        state.uploading = true;
      })
      .addCase(updateAVideo.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploaded = true;
      })
      .addCase(deleteAVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAVideo.fulfilled, (state, action) => {
        state.loading = false;
        // state.videos.docs = state.videos.docs.filter(
        //   (video) => video._id !== action.payload.videoId
        // );
      })
      .addCase(togglePublishedStatus.fulfilled, (state) => {
        state.publishToggled = !state.publishToggled;
      });
  },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;
