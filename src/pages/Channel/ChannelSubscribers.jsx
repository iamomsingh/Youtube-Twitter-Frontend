import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

const ChannelSubscribers = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user.profileData?._id);
  const ChannelSubscribers = useSelector(
    (state) => state.subscription?.channelSubscribers
  );
  console.log(ChannelSubscribers);

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers(channelId));
    }
  }, [dispatch, channelId]);
  return (
    <>
      {ChannelSubscribers?.map((subscriber) => (
        <div
          key={subscriber?.subscriber?._id}
          className='flex px-3 py-5 justify-between items-center text-white'
        >
          <div className='flex gap-3 items-center'>
            <Avatar
              src={subscriber?.subscriber?.avatar.url}
              channelName={subscriber?.subscriber?.userName}
            />
            <div>
              <h5 className='text-sm'>{subscriber?.subscriber?.userName}</h5>
              <span className='text-xs text-slate-400'>
                {subscriber?.subscriber?.subscribersCount} Subscribers
              </span>
            </div>
          </div>
          <div>
            <Button className='bg-purple-500 text-black text-xs py-1 px-2'>
              {subscriber?.subscriber?.subscribedToSubscriber
                ? "Subscribed"
                : "subscribe"}
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChannelSubscribers;
