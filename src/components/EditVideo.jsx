import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "./icons";
import { Input2, Button, Spinner, GetImagePreview } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAVideo, updateUploadState } from "../store/Slices/videoSlice";

const EditVideo = ({
  videoId,
  title,
  description,
  setEditVideoPopup,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const handleClosePopUp = () => {
    setEditVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
      editVideo: false,
    }));
  };

  const updateVideo = async (data) => {
    await dispatch(updateAVideo({ videoId, data }));
    // console.log("update successfully", data);
    setEditVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
      editVideo: false,
    }));
    dispatch(updateUploadState());
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
  }, [title, description, setValue]);

  if (uploading) {
    return (
      <>
        <div className='w-52 border border-slate-600 bg-black flex gap-2 p-3'>
          <Spinner />
          <span className='text-md font-bold'>Updating video...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='fixed top-25 sm:top-15 left-0 w-full h-full flex justify-center item-center bg-black bg-opacity-75 z-50'>
        <form
          onSubmit={handleSubmit(updateVideo)}
          className='bg-black space-y-2 border h-[30rem] overflow-y-scroll outline:none p-2 '
        >
          <div className='sticky left-0 top-0 z-50 bg-[#222222] flex justify-between item-center px-3 py-1 mb-2'>
            <div>
              <h1 className='font-bold'>Edit Video</h1>
              <p className='text-xs mb-2'>
                Share where you've worked on your profile.
              </p>
            </div>

            <IoCloseCircleOutline
              size={23}
              onClick={handleClosePopUp}
              className='cursor-pointer'
            />
          </div>

          {/* <div className='p-2'> */}
          {/* <Input2
            type='file'
            label='Thumbnail *'
            accept='image/png, image/jpeg'
            {...register("thumbnail", {
              required: "Thumbnail is required ",
            })}
          />
           */}
          <div className='p-2 grid lg:grid-cols-2 grid-cols-1 gap-5 z-40'>
            <div>
              <GetImagePreview
                name={"thumbnail"}
                control={control}
                label={"Thumbnail: "}
                cameraIcon
                cameraSize={30}
                className={"object-contain w-full min-w-xl h-72 min-h-32"}
                image={thumbnail}
              />
              <span className='text-red-500 text-xs'>
                {errors.thumbnail?.message}
              </span>
            </div>

            <div className='flex flex-col justify-between sm:gap-0 gap-2'>
              <Input2
                type='text'
                label='Title *'
                {...register("title", {
                  required: "Title is required ",
                })}
              />
              <span className='text-red-500 text-xs'>
                {errors.title?.message}
              </span>

              <div className='mb-4'>
                <label>Description *</label>
                <textarea
                  rows={5}
                  className='focus:bg-[#222222] text-sm overflow-y-scroll bg-transparent outline-none border w-full mt-1 p-1'
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <span className='text-red-500' text-xs>
                  {errors.description?.message}
                </span>
              </div>
              <div className='flex gap-3'>
                <Button
                  className='flex-1 border p-2'
                  onClick={handleClosePopUp}
                >
                  Cancel
                </Button>
                <Button
                  className='flex-1 bg-purple-500 p-2 font-bold'
                  textColor='text-black'
                  type='submit'
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditVideo;
