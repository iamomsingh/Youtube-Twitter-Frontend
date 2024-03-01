import React, { useEffect } from "react";
import { Container, VideoList } from "../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userWatchHistory } from "../store/Slices/userSlice";
import HomeSkeleton from "../skelton/HomeSkelton";
import NoVideosFound from "../components/NoVideoFound";

const History = () => {
  const loading = useSelector((state) => state.user?.loading);
  const videos = useSelector((state) => state.user?.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userWatchHistory());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (videos?.length == 0) {
    return <NoVideosFound />;
  }

  if (videos && videos.length > 0) {
    return (
      <Container>
        <div className='grid max-h-screen mb-20 sm:m-0 overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 grid-col-1 text-white'>
          {videos.map((video) => (
            <Link to={`/watch/${video._id}`} key={video._id}>
              <VideoList
                key={video._id}
                avatar={video.owner?.avatar?.url}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video.owner?.userName}
                videoId={video._id}
              />
            </Link>
          ))}
        </div>
      </Container>
    );
  }

  return <></>;
};

export default History;
