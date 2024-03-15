import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container, NoVideosFound } from "../components";
import HomeSkeleton from "../skelton/HomeSkelton";

const HomePage = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const { loading } = useSelector((state) => state.video);
  const { hasNextPage } = useSelector((state) => state.video?.videos);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideos({}));

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  const fetchMoreVideos = useCallback(() => {
    if (hasNextPage) {
      dispatch(getAllVideos({ page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, hasNextPage, dispatch]);

  if (videos?.docs?.length === 0) {
    return <NoVideosFound text={"There are no videos available"} />;
  }

  return (
    <Container>
      <div className='text-white mt-0 mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll'>
        {videos?.map((video) => (
          <VideoList
            key={video._id}
            avatar={video.ownerDetails?.avatar?.url}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url}
            createdAt={video.createdAt}
            views={video.views}
            channelName={video.ownerDetails.userName}
            videoId={video._id}
          />
        ))}
      </div>
      {loading && <HomeSkeleton />}
    </Container>
  );
};

export default HomePage;
