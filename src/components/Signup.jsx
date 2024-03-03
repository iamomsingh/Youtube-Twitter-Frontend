import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  userLogin,
  createAccount,
  getCurrentUser,
} from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skelton/LoginSkelton.jsx";

function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));

    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const loginResult = await dispatch(userLogin({ username, password }));
      const user = await dispatch(getCurrentUser());

      if (loginResult?.payload && user) {
        //.type === "login/fulfilled"
        navigate("/"); // /terms&conditions
        console.log("registered");
      } else {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <>
      <div className=' fixed inset-0 text-white px-3 flex justify-center items-center bg-black bg-opacity-75 z-50'>
        <div className='flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3'>
          <div className='flex items-center gap-2 mt-5'>
            <Logo />
          </div>
          <form onSubmit={handleSubmit(submit)} className='space-y-5 p-2'>
            <Input
              label='Username: '
              type='text'
              placeholder=''
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <span className='text-white'>{errors.username.message}</span>
            )}
            <Input
              label='Email: '
              type='email'
              placeholder=''
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span className='text-white'>{errors.email.message}</span>
            )}
            <Input
              label='Fullname: '
              type='text'
              placeholder=''
              {...register("fullName", {
                required: true,
              })}
            />
            {errors.fullname && (
              <span className='text-white'>{errors.fullname.message}</span>
            )}
            <Input
              label='Password: '
              type='password'
              placeholder=''
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <Input
              label='Profile Picture: '
              type='file'
              placeholder=''
              {...register("avatar", {
                required: true,
              })}
              accept='image/png, image/jpeg'
            />
            {errors.password && <span>{errors.avatar.message}</span>}

            <Button
              type='submit'
              bgColor='bg-purple-500'
              className='w-full sm:py-3 py-2 hover:bg-purple-700 text-lg'
            >
              Signup
            </Button>

            <p className='text-center text-sm'>
              Already have an account?{" "}
              <Link
                to={"/login"}
                className='text-purple-600 cursor-pointer hover:opacity-70'
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
