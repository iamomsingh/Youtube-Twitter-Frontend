import React, { useEffect } from "react";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice.js";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
  const dispatch = useDispatch();
  const { userName } = useParams();

  const channel = useSelector((state) => state.user?.profileData);

  useEffect(() => {
    dispatch(userChannelProfile(userName));
  }, [dispatch, userName]);

  window.scrollTo(0, 0);

  return (
    <>
      {channel && (
        <ChannelHeader
          userName={userName}
          coverImage={channel?.coverImage.url}
          avatar={channel?.avatar.url}
          subscribedCount={channel?.channelsSubscribedToCount || 0}
          fullName={channel?.fullName}
          subscribersCount={channel?.subscribersCount || 0}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
        />
      )}
      <ChannelNavigate userName={userName} />
      <div className='overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0'>
        <Outlet />
      </div>
    </>
  );
}

export default Channel;
