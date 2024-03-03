import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import { Video } from "../components";

const VideoDetail = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
    }
  }, [dispatch, videoId]);
  return <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />;
};

export default VideoDetail;
