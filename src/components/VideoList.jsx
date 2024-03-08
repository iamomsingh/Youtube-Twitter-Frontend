import React from "react";
import { timeAgo, formatDuration } from "../helpers/time.js";
import { useNavigate } from "react-router-dom";

function VideoList({
  thumbnail,
  duration,
  title,
  views = 1,
  avatar,
  channelName,
  createdAt,
  videoId,
}) {
  const navigate = useNavigate();

  const handleChannelClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };

  return (
    <>
      <div
        className='w-full sm:p-2 cursor-pointer'
        onClick={() => navigate(`/watch/${videoId}`)}
      >
        <div className='relative sm:h-60 h-48'>
          <img src={thumbnail} className='object-cover w-full h-full' />
          <span className='absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2'>
            {formatDuration(duration)}
          </span>
        </div>
        <div className='flex items-center py-2 px-2 gap-2'>
          {avatar && (
            <div onClick={handleChannelClick}>
              <img
                src={avatar}
                className='w-10 h-10 rounded-full object-cover border border-slate-700'
                alt=''
              />
            </div>
          )}
          <div>
            <h2 className='font-medium'>{title}</h2>
            <div className='text-xs space-x-2 text-slate-400'>
              <span>{views} Views</span> <span>{timeAgo(createdAt)}</span>
            </div>
            {channelName && (
              <div onClick={handleChannelClick}>
                <h2 className='text-xs space-x-1 text-slate-200'>
                  {channelName}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoList;
