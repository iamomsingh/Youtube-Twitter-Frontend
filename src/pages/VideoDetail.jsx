import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import { Description, Video } from "../components";

const VideoDetail = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
    }
  }, [dispatch, videoId]);
  return (
    <>
      <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />
      <Description
        avatar={video?.owner?.avatar.url}
        channelName={video?.owner?.userName}
        createdAt={video?.createdAt}
        description={video?.description}
        isSubscribed={video?.owner?.isSubscribed}
        likesCount={video?.likesCount}
        subscribersCount={video?.owner?.subscribersCount}
        title={video?.title}
        views={video?.views}
        key={video?._id}
        isLiked={video?.isLiked}
        videoId={video?._id}
        channelId={video?.owner?._id}
      />
    </>
  );
};

export default VideoDetail;
