import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
  loading: false,
  comments: [],
  totalComments: null,
  hasNextPage: false,
};

export const createAComment = createAsyncThunk(
  "createAComment",
  async ({ videoId, content }) => {
    try {
      const response = await axiosInstance.post(`/api/v1/comment/${videoId}`, {
        content,
      });
      return response.data?.data;
    } catch (error) {
      toast.error("Failed to create comment");
      //error?.response?.data?.error
      throw error;
    }
  }
);

export const editAComment = createAsyncThunk(
  "editAComment",
  async ({ commentId, content }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/comment/c/${commentId}`,
        { content }
      );
      toast.success(response.data?.message);
      return response?.data?.data;
    } catch (error) {
      toast.error("Failed to edit comment");
      throw error;
    }
  }
);

export const deleteAComment = createAsyncThunk(
  "deleteAComment",
  async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/comment/c/${commentId}`
      );
      toast.success(response.data?.message);
      return response?.data?.data;
    } catch (error) {
      toast.error("Failed to delete comment");
      //error?.response?.data?.error
      throw error;
    }
  }
);

export const getVideoComments = createAsyncThunk(
  "getVideoComments",
  async ({ videoId, page, limit }) => {
    const url = new URL(`/api/v1/comment/${videoId}`);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);

    try {
      const response = await axiosInstance.get(url);
      return response?.data?.data;
    } catch (error) {
      toast.error("Failed to fetch video comments");
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    cleanUpComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideoComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideoComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = [...state.comments, ...action.payload.docs];
        state.totalComments = action.payload.totalDocs;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(createAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAComment.fulfilled, (state, action) => {
        (state.loading = false), state.comments.unshift(action.payload);
        state.totalComments++;
      })
      .addCase(editAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAComment.fulfilled, (state) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
        state.totalComments--;
      });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
