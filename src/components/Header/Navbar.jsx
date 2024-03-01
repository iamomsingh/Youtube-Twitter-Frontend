import React, { useState } from "react";
import { IoLogoYoutube } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { SlMenu } from "react-icons/sl";
import { BiLike } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";
import Search from "./Search";
import Button from "../Button";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userName = useSelector((state) => state.auth?.userData?.userName);
  const profileImg = useSelector((state) => state.auth.userData?.avatar.url);

  const sidePanelItems = [
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${userName}`,
    },
    {
      icon: <MdOutlineContactSupport size={25} />,
      title: "Support",
      url: "/support",
    },
    {
      icon: <CiSettings size={25} />,
      title: "Settings",
      url: "/settings",
    },
  ];

  return (
    <>
      <nav className='w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-0 border-gray-500 sticky top-0 z-50'>
        <div className='flex items-center justify-center gap-2 cursor-pointer'>
          <IoLogoYoutube size={33} color='red' />
          <span className='font-bold text-white'>YouTube</span>
        </div>

        {/* search for large screens */}
        <div className='w-full sm:w-1/3 hidden sm:block'>
          <Search />
        </div>

        {/* search for small screens */}
        <div className='text-white w-full cursor-pointer inline-flex justify-end sm:hidden pr-4'>
          <CiSearch size={30} fontWeight={"bold"} />
        </div>

        {/* login and signup buutons */}
        {authStatus ? (
          <div className='rounded-full sm:block hidden'>
            <img
              src={profileImg}
              alt='profileImg'
              className='rounded-full w-10 h-10 object-cover'
            />
          </div>
        ) : (
          <div className='space-x-2 sm:block hidden'>
            <Link to={"/login"}>
              <Button className='bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2'>
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className='font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 '>
                Sign up
              </Button>
            </Link>
          </div>
        )}

        {/* hamburger for smaller screens */}
        <div className='sm:hidden block'>
          <div className='text-white cursor-pointer'>
            <SlMenu size={25} onClick={() => setToggleMenu((prev) => !prev)} />
          </div>
        </div>

        {/* Side panel for smaller screens */}
        {toggleMenu && (
          <div className='fixed right-0 top-0 text-white flex flex-col border-l-2 h-screen w-4/6 bg-[#0F0F0F] sm-hidden rounded-lg outline-none'>
            <div className='w-full border-b-2 h-20 flex items-center justify-between mb-2 px-3'>
              <div className='flex text-center gap-2 cursor-pointer'>
                <IoLogoYoutube size={35} color='red' />
                <span className='text-lg font-bold'>YouTube</span>
              </div>
              <IoCloseCircleOutline
                size={35}
                onClick={() => setToggleMenu((prev) => !prev)}
                className='cursor-pointer'
              />
            </div>

            <div className='flex flex-col justify-between h-full px-3 py-5 '>
              <div className='flex flex-col gap-5'>
                {sidePanelItems.map((item) => (
                  <NavLink
                    to={item.url}
                    key={item.title}
                    onClick={() => setToggleMenu((prev) => !prev)}
                    className={({ isActive }) =>
                      isActive ? "bg-purple-500" : ""
                    }
                  >
                    <div className='flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-400'>
                      <div>{item.icon}</div>
                      <span className='text-lg'>{item.title}</span>
                    </div>
                  </NavLink>
                ))}
              </div>

              {!authStatus && (
                <div className='flex flex-col space-y-5 mb-3'>
                  <Link to={"/login"}>
                    <Button className='w-full bg-[#222222] border hover:bg-purple-500 rounded-md  border-slate-500 py-1 px-3'>
                      Login
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button className='w-full font-semibold border border-slate-500 rounded-md hover:bg-purple-500 hover:text-black py-1 px-3'>
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
