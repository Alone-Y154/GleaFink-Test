import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ redirectTo }) => {
  // Access the token and bypassMode from the Redux store
  const token = useSelector((state) => state.auth.token);
  const bypassMode = localStorage.getItem('bypassMode') === 'true';
  console.log("Token:", token, "Bypass Mode:", bypassMode);
  // Allow access if the user is authenticated or in bypass mode
  if (token || bypassMode) {
    return <Outlet />;
  }

  // Redirect to the login page if not authenticated
  return <Navigate to={redirectTo} />;
};

export default ProtectedRoute;