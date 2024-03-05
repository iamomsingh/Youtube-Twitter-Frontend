import React from "react";

function Video({ src, poster }) {
  return (
    <>
      <div className='sticky top-5 z-40 md:relative'>
        <video
          src={src}
          poster={poster}
          autoPlay
          controls
          playsInline
          className='sm:h-[64vh] sm:max-w-4xl  h-60 w-full object-contain gap-y-2'
        ></video>
      </div>
    </>
  );
}

export default Video;
