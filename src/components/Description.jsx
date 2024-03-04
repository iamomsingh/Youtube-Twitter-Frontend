import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../helpers/time";
import { Link } from "react-router-dom";
import { Button, Like } from "./index";
import { IoMdShareAlt } from "react-icons/io";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const Description = ({
  title,
  views,
  createdAt,
  channelName,
  avatar,
  subscribersCount,
  likesCount,
  isSubscribed,
  description,
  isLiked,
  videoId,
  channelId,
}) => {
  const dispatch = useDispatch();
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);

  const handleSubsribe = () => {};
  const handleSubscribe = () => {};
  return (
    <>
      <section className='sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2'>
        <div className='border-b-0 border-slate-700'>
          <div className='space-y-1.5 mb-2'>
            <h1 className='sm:text-2xl font-semibold'>{title}</h1>
            <div className='flex flex-col w-full h-full justify-between sm:flex-row sm:py-3'>
              <div className='flex gap-6 justify-between items-center'>
                <Link
                  to={`/channel/${channelName}/videos`}
                  className='flex gap-2'
                >
                  <img
                    src={avatar}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                  <div>
                    <h1 className='font-semibold'>{channelName}</h1>
                    <p className='text-xs text-slate-400'>
                      {localSubscribersCount} Subscribers
                    </p>
                  </div>
                </Link>

                <div onClick={handleSubsribe}>
                  <Button
                    onClick={handleSubscribe}
                    className='border-slate-500 hover:scale-110 transition-all rounded-full text-black font-bold px-4 py-1 bg-purple-500'
                  >
                    {/* {localIsSubscribed ? "Subscribed" : "Subscribe"} */}
                    Subscribe
                  </Button>
                </div>
              </div>

              <div className='flex justify-start items-center gap-2 my-3'>
                <div className=' rounded-full w-24 flex justify-center bg-[#222222] py-1'>
                  <Like
                    isLiked={isLiked}
                    videoId={videoId}
                    likesCount={likesCount}
                    size={25}
                  />
                </div>
                <div className='rounded-full w-24 flex justify-center bg-[#222222] py-1'>
                  <Button className='flex justify-start items-center gap-1'>
                    <IoMdShareAlt size={25} />
                    Share
                  </Button>
                </div>
                <div className='rounded-full w-24 flex justify-center bg-[#222222] py-1'>
                  <Button className='flex justify-start items-center gap-1'>
                    <MdOutlinePlaylistAdd size={25} />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=' bg-[#222222] rounded-xl  p-2 outline-none'>
          <div className='mb-2'>
            <span className='text-sm text-slate-400'>
              {views} views {"  "}
            </span>
            <span className='text-sm text-slate-400'>{timeAgo(createdAt)}</span>
          </div>
          <p className='text-xs '>{description}</p>
        </div>
      </section>
    </>
  );
};

export default Description;
