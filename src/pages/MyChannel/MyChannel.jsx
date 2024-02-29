import React, { useEffect } from "react";
import { ChannelHeader } from "../../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice";
import { ChannelNavigate } from "../../components/index.js";
import { Outlet } from "react-router-dom";

function MyChannel() {
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.auth?.userData);
  const profile = useSelector((state) => state.user?.profileData);

  useEffect(() => {
    if (channel) {
      dispatch(userChannelProfile(channel?.userName));
    }
  }, [dispatch, channel]);

  return (
    <>
      <ChannelHeader
        username={channel?.userName}
        coverImage={profile?.coverImage.url}
        avatar={profile?.avatar.url}
        subscribedCount={profile?.channelsSubscribedToCount || 0}
        fullName={profile?.fullName}
        subscribersCount={profile?.subscribersCount || 0}
      />
      <ChannelNavigate />
      <Outlet />
    </>
  );
}

export default MyChannel;
