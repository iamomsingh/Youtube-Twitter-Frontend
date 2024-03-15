import React, { useEffect } from "react";
import { RiHome6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoFolderOutline } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../../store/Slices/subscriptionSlice";
import { Avatar } from "../../components";

const Sidebar = () => {
  const userName = useSelector((state) => state.auth?.userData?.userName);
  const sidebarTopItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${userName}/videos`,
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscribers",
      url: "/subscribers",
    },
  ];

  const bottomBarItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscribers",
      url: "/subscribers",
    },
  ];

  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription.mySubscriptions
  );
  const subscriberId = useSelector((state) => state.auth?.userData?._id);

  useEffect(() => {
    if (subscriberId) {
      dispatch(getSubscribedChannels(subscriberId));
    }
  }, [dispatch, subscriberId]);
  return (
    <>
      <div className='sm:block hidden'>
        <div className='text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r-[0.5] h-[93vh] flex flex-col justify-between'>
          <section>
            <div className='flex flex-col gap-4 mt-5 border-b-2 border-slate-300 mb-5'>
              {sidebarTopItems.map((item) => (
                <NavLink
                  to={item.url}
                  key={item.title}
                  className={({ isActive }) =>
                    isActive ? "bg-purple-500 rounded-lg" : ""
                  }
                >
                  <div className='flex items-center gap-2 justify-center sm:justify-start rounded-lg hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'>
                    <div>{item.icon}</div>
                    <span className='text-base hidden md:block'>
                      {item.title}
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>

            <div className='flex flex-col gap-2 mt-5'>
              <h2>Subscriptions</h2>
              {subscriptions?.map((subscription) => (
                <NavLink
                  to={`/channel/${subscription.subscribedChannel.userName}/videos`}
                  key={subscription?.subscribedChannel?._id}
                  className={({ isActive }) =>
                    isActive ? "bg-purple-500 rounded-lg" : ""
                  }
                >
                  <div className='flex items-center gap-2 justify-center sm:justify-start rounded-lg hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'>
                    <Avatar
                      src={subscription?.subscribedChannel?.avatar.url}
                      channelName={subscription?.subscribedChannel?.userName}
                    />
                    <h5>{subscription?.subscribedChannel?.userName}</h5>
                  </div>
                </NavLink>
              ))}
            </div>
          </section>

          <div className='space-y-4 mb-10'>
            <Link
              to={"/support"}
              className='flex items-center gap-2 justify-center sm:justify-start rounded-lg hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'
            >
              <MdOutlineContactSupport size={25} />
              <span className='text-base hidden md:block'>Support</span>
            </Link>
            <Link
              // to={"/setting"}
              className='flex items-center gap-2 justify-center sm:justify-start rounded-lg hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'
            >
              <CiSettings size={25} />
              <span className='text-base hidden md:block'>Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* for mobile sidebar is bottom bar*/}
      <div className='border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]'>
        {bottomBarItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) => (isActive ? "text-purple-500" : "")}
          >
            <div className='flex flex-col items-center gap-1 cursor-pointer p-1'>
              {item.icon}
              <span className='text-sm'>{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
