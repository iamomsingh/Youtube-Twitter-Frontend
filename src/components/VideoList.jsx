import React from "react";
import { timeAgo, formatDuration } from "../helpers/time.js";
import { Link } from "react-router-dom";

function VideoList({
  thumbnail,
  duration,
  title,
  views = 0,
  avatar,
  channelName,
  createdAt,
  channelId,
}) {
  return (
    <>
      <div className='w-full p-2'>
        <div className='relative'>
          <img src={thumbnail} className='object-cover' />
          <span className='absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2'>
            {formatDuration(duration)}
          </span>
        </div>
        <div className='flex items-center py-1 px-2 gap-2'>
          {avatar && (
            <Link to={`/${channelId}`}>
              <img src={avatar} className='w-10 h-10 rounded-full' alt='' />
            </Link>
          )}
          <div>
            <h2 className='font-medium'>{title}</h2>
            <div className='text-xs space-x-1 text-slate-400'>
              <span>{views} Views</span> .
              <span>{timeAgo(createdAt)} years ago</span>
            </div>
            {channelName && (
              <h2 className='text-xs space-x-1 text-slate-200'>
                {channelName}
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoList;
