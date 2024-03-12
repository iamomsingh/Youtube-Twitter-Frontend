import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  DeleteConfirmation,
  EditVideo,
  HeaderSection,
  Navbar,
  StatsSection,
  UploadVideo,
  VideoTable,
} from "../components";
import {
  getChannelStats,
  getChannelVideos,
} from "../store/Slices/dashboardSlice";
import { deleteAVideo } from "../store/Slices/videoSlice";

const AdminDashboard = () => {
  const userName = useSelector((state) => state.auth.userData?.userName);
  const { channelStats: dashboard, channelVideos: videos } = useSelector(
    (state) => state.dashboard
  );
  // console.log(dashboard);
  // console.log(videos);
  const {
    uploaded,
    publishToggled,
    loading: deleting,
  } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });

  const handleDeleteVideo = async () => {
    dispatch(deleteAVideo(videoDetails?._id));
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
    console.log("deleted successfully");
  };

  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled, deleting]);

  window.scrollTo(0, 0);

  return (
    <>
      <Navbar />
      <Container>
        <div className=' w-full relative h-screen text-white space-y-5 z-10 py-4 px-1'>
          {/* uploadVideoPopup */}
          {popUp.uploadVideo && <UploadVideo setUploadVideoPopup={setPopUp} />}

          {/* editVideoPopup */}
          {popUp.editVideo && (
            <div className='w-full flex justify-center top-24 fixed z-20'>
              <EditVideo
                setEditVideoPopup={setPopUp}
                title={videoDetails?.title}
                description={videoDetails?.description}
                videoId={videoDetails?._id}
              />
            </div>
          )}

          {/* deleteVideoPopup */}
          {popUp.deleteVideo && (
            <div className='w-full fixed top-52 flex justify-center z-20'>
              <DeleteConfirmation
                video={true}
                onCancel={() =>
                  setPopUp((prev) => ({
                    ...prev,
                    deleteVideo: !prev.deleteVideo,
                  }))
                }
                onDelete={handleDeleteVideo}
              />
            </div>
          )}

          {/* Dashboard Header */}
          <HeaderSection userName={userName} setPopUp={setPopUp} />

          {/* channel stats section */}
          <StatsSection dashboard={dashboard} />

          {/* Table for managing channel videos */}
          <VideoTable
            videos={videos}
            setPopUp={setPopUp}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  );
};

export default AdminDashboard;
