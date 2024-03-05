import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import {
  CommentList,
  Description,
  InfiniteScroll,
  TweetAndComment,
  Video,
} from "../components";
import {
  cleanUpComments,
  getVideoComments,
} from "../store/Slices/commentSlice";

const VideoDetail = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video } = useSelector((state) => state.video);
  // const { comments, totalComments, hasNextPage, loading } = useSelector(
  //   (state) => state.comment
  // );
  const comments = useSelector((state) => state.comment?.comments);
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const loading = useSelector((state) => state.comment?.loading);
  const { status, userData } = useSelector((state) => state.auth);
  console.log(comments);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
      dispatch(getVideoComments({ videoId }));
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
      <div className='text-white font-semibold sm:px-5 px-3'>
        {totalComments} Comments
      </div>
      <TweetAndComment
        comment={true}
        videoId={video?._id}
        authStatus={status}
        profileImg={userData?.avatar.url}
      />
      {/* <InfiniteScroll fetchMore={fetchMoreComments} hasNextPage={hasNextPage}> */}
      <div className='w-full sm:max-w-4xl'>
        {comments?.map((comment) => (
          <CommentList
            key={comment?._id}
            avatar={comment?.owner?.avatar?.url}
            commentId={comment?._id}
            content={comment?.content}
            createdAt={comment?.createdAt}
            fullName={comment?.owner?.fullName}
            isLiked={comment?.isLiked}
            likesCount={comment?.likesCount}
            userName={comment?.owner?.userName}
          />
        ))}
        {/* {loading && (
          <div className='w-full flex justify-center items-center'>
            <Spinner width={10} />
          </div>
        )} */}
      </div>
      {/* </InfiniteScroll> */}
    </>
  );
};

export default VideoDetail;
