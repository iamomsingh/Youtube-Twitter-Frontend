import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LoginPopup } from "../components";

const AuthLayout = () => {
  const { status } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     if (!authentication && authStatus !== authentication) {
  //       return;
  //     }
  //   }, [navigate, authentication, authStatus]);

  //   if (authentication && authStatus !== authentication) {
  //     return <LoginPopup />;
  //   }
  return status ? <Outlet /> : <LoginPopup />;
};

export default AuthLayout;
