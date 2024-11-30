/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isProtected, redirectToIfAuthenticated, redirectToIfNotAuthenticated }) => {
  const token = useSelector((state) => state.auth.token);
  const bypassMode = useSelector((state) => state.auth.bypassMode);

  if (isProtected) {
    // Protected Route Logic: Redirect if not authenticated or not in bypass mode
    if (!token && !bypassMode) {
      return <Navigate to={redirectToIfNotAuthenticated} />;
    }
  } else {
    // Public Route Logic: Redirect if authenticated or in bypass mode
    if (token || bypassMode) {
      return <Navigate to={redirectToIfAuthenticated} />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;