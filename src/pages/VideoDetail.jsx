import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import {
  CommentList,
  Description,
  InfiniteScroll,
  TweetAndComment,
  Spinner,
  Video,
  Navbar,
  Container,
} from "../components";
import {
  cleanUpComments,
  getVideoComments,
} from "../store/Slices/commentSlice";

const VideoDetail = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video } = useSelector((state) => state.video);
  const { comments, totalComments, hasNextPage, loading } = useSelector(
    (state) => state.comment
  );
  const { status, userData } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
      dispatch(getVideoComments({ videoId }));
    }
  }, [dispatch, videoId]);

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, loading, hasNextPage, dispatch, videoId]);

  return (
    <>
      <Navbar />
      <Container>
        <Video
          src={video?.videoFile?.url}
          poster={video?.thumbnail?.url}
          className='lg:m'
        />
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

        {status && (
          <TweetAndComment
            comment={true}
            videoId={video?._id}
            profileImg={userData?.avatar?.url}
          />
        )}

        <InfiniteScroll
          fetchMore={fetchMoreComments}
          hasNextPage={hasNextPage}
          className='mb-96'
        >
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
            {loading && (
              <div className='w-full flex justify-center items-center'>
                <Spinner width={10} />
              </div>
            )}
          </div>
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default VideoDetail;
