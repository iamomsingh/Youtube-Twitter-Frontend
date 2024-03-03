import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";
import Navbar from "./components/Header/Navbar";
import { Toaster } from "react-hot-toast";

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

      <Toaster
        position='top-right'
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
};

export default Layout;
