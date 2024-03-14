import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  playlists: [],
  playlist: [],
};

export const createAPlaylist = createAsyncThunk(
  "createAPlaylist",
  async ({ name, description }) => {
    try {
      const response = await axiosInstance.post("/api/v1/playlist", {
        name,
        description,
      });
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("playlist not created!!");
      throw error;
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "addVideoToPlaylist",
  async ({ videoId, playlistId }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/playlist/add/${videoId}/${playlistId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("adding video to playlist failed!!");
      throw error;
    }
  }
);

export const removeVideoFromPLaylist = createAsyncThunk(
  "removeVideoFromPlaylist",
  async ({ videoId, playlistId }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/playlistr/remove/${videoId}/${playlistId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("removing video failed!!");
      throw error;
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async (playlistId) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/playlist/${playlistId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("failed to fetch playlist!!");
      throw error;
    }
  }
);

export const getPlaylistsByUser = createAsyncThunk(
  "getPlaylistByUser",
  async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/playlist/user/${userId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("failed to fetch playlist!!");
      throw error;
    }
  }
);

export const updatePlaylist = createAsyncThunk(
  "updatePlaylist",
  async ({ playlistId, name, description }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/playlist/${playlistId}`,
        { name, description }
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("failed to update playlist!!");
      throw error;
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async (playlistId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/playlist/${playlistId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("failed to delete playlist!!");
      throw error;
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(createAPlaylist.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(createAPlaylist.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.playlists = state.playlists.unshift(action.payload);
      //   })
      //   .addCase(addVideoToPlaylist.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.playlist = state.playlist.videos.unshift(action.payload);
      //   })
      //   .addCase(removeVideoFromPLaylist.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(removeVideoFromPLaylist.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.playlist = state.playlist.videos.filter(
      //       (video) => video._id !== action.payload.videoId
      //     );
      //   })
      //   .addCase(getPlaylistById.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(getPlaylistById.fulfilled, (state) => {
      //     state.loading = false;
      //   })
      //   .addCase(getPlaylistByUser.pending, (state) => {
      //     state.loading = true;
      //   })
      // .addCase(getPlaylistByUser.fulfilled, (state, action) => {
      //   // state.loading = false;
      //   state.playlists = action.payload;
      // })
      .addCase(getPlaylistsByUser.fulfilled, (state, action) => {
        state.playlists = action.payload;
      });
    // .addCase(updatePlaylist.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(updatePlaylist.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.playlist = action.payload;
    // })
    // .addCase(deletePlaylist.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(deletePlaylist.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.playlists = state.playlists.filter(
    //     (playlist) => playlist._id !== action.payload.playlistId
    //   );
    // });
  },
});

export const {} = playlistSlice.actions;

export default playlistSlice.reducer;
