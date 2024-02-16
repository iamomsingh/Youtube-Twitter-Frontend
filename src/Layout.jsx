import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Header/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='sm: flex float-none'>
        <div>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
