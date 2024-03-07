import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  HeaderSection,
  Navbar,
  StatsSection,
  VideoTable,
} from "../components";
import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const AdminDashboard = () => {
  const userName = useSelector((state) => state.auth.userData?.userName);

  return (
    <>
      <Navbar />
      <Container>
        <div className=' w-full relative h-screen text-white space-y-5 z-10 py-4 px-1'>
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
