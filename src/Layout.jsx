import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";
import Navbar from "./components/Header/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='sm:flex flex-none'>
        <div>
          <Sidebar />
        </div>
        <div className='sm: flex-1'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
