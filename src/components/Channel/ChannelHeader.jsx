import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, EditAvatar } from "../index";
import { NavLink, Link } from "react-router-dom";
import { toggleSubscription } from "../../store/Slices/subscriptionSlice";

function ChannelHeader({
  coverImage,
  avatar,
  userName,
  fullName,
  subscribersCount,
  subscribedCount,
  isSubscribed,
  channelId,
  edit,
}) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.profileData?._id);
  const user = useSelector((state) => state.auth?.userData?._id);

  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);

  useEffect(() => {
    setLocalSubscribersCount(subscribersCount);
    setLocalIsSubscribed(isSubscribed);
  }, [subscribersCount, isSubscribed]);

  const handleSubscribe = () => {
    dispatch(toggleSubscription(channelId));
    setLocalIsSubscribed((prev) => !prev);
    if (localIsSubscribed) {
      setLocalSubscribersCount((prev) => prev - 1);
    } else {
      setLocalSubscribersCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className='w-full text-white'>
        {/* coverImage section */}
        <section className='w-full bg-green-300'>
          {coverImage ? (
            <div className='relative'>
              <img
                src={coverImage}
                alt='cover-image'
                className='sm:h-40 h-28 w-full object-cover'
              />
              {edit && (
                <div className='absolute inset-0 flex justify-center items-center'>
                  <EditAvatar cover={true} preImage={coverImage} />
                </div>
              )}
            </div>
          ) : (
            <div className='sm:h-40 h-28 w-full border-slate-600 border-b bg-black'></div>
          )}
        </section>
        {/*channel details section  */}
        <section className=' w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4'>
          <div className='relative h-12'>
            <div className='relative sm:w-32 w-28 sm:h-32 h-32'>
              <img
                src={avatar}
                alt='avatar'
                className='rounded-full object-cover sm:w-32 w-28 sm:h-32 h-28 absolute sm:bottom-10 bottom-20 outline-none'
              />
              {edit && (
                <div className='absolute inset-0 flex justify-center items-start'>
                  <EditAvatar preImage={avatar} />
                </div>
              )}
            </div>
          </div>
          <div className='w-full md:h-24 sm:h-20 flex justify-between items-start px-1'>
            <div>
              <h1 className='text-xl font-bold'>{userName}</h1>
              <h3 className='text-sm text-slate-400'>@{fullName}</h3>
              <div className='flex gap-1'>
                <p className='text-xs text-slate-400'>
                  {localSubscribersCount &&
                    `${localSubscribersCount} Subscribers`}
                </p>
                <p className='text-xs text-slate-400'>
                  {subscribedCount && `${subscribedCount}`} {"Subscribed"}
                </p>
              </div>
            </div>

            {user == userProfile && !edit && (
              <Link to={`/channel/${userName}/edit`}>
                <Button className='border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500'>
                  Edit
                </Button>
              </Link>
            )}

            {user != userProfile && !edit && (
              <Button
                onClick={handleSubscribe}
                className='border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500'
              >
                {localIsSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            )}

            {edit && (
              <Link to={`/channel/${userName}`}>
                <Button className='border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500'>
                  View Channel
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default ChannelHeader;
