import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTweet } from "../store/Slices/tweetSlice";
import { createAComment } from "../store/Slices/commentSlice";

function TweetAndComment({ tweet, comment, videoId, profileImg }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const sendContent = (data) => {
    if (data) {
      if (tweet) {
        dispatch(createTweet(data));
      } else if (comment) {
        dispatch(createAComment({ content: data.content, videoId }));
      }
      setValue("content", "");
    }
  };

  return (
    <>
      <div className='flex justify-start items-center sm:p-5 p-2 sm:max-w-4xl w-full'>
        <div className='rounded-full'>
          <img
            src={profileImg}
            alt='profileImg'
            className='rounded-full w-12 h-12 object-cover'
          />
        </div>
        <form
          onSubmit={handleSubmit(sendContent)}
          className='sm:p-3 p-2 sm:max-w-4xl w-full relative'
        >
          <textarea
            placeholder={`${tweet ? "Write a tweet" : "Add a Comment"}`}
            className={`p-2 text-sm pr-16 bg-[#222222] outline-none w-full h-12 flex items-center justify-start rounded-lg`}
            {...register("content", { required: true })}
          />
          <Button
            type='submit'
            className='bg-purple-500 px-2 py-1 rounded-full text-black hover:scale-110 transition-all ease-in absolute sm:bottom-5 sm:right-5 bottom-5 right-5 text-xs sm:text-base'
          >
            {`${tweet ? "Tweet" : "Comment"}`}
          </Button>
        </form>
      </div>
    </>
  );
}

export default TweetAndComment;
