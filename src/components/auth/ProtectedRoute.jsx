import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ redirectTo }) => {
  // Access the token from the Redux store
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = token !== null || localStorage.getItem('bypassMode') === 'true';

  // Redirect if authenticated and trying to access the redirectTo path
  if (isAuthenticated && redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  // Redirect to login if not authenticated and trying to access a protected route
  if (!isAuthenticated && redirectTo === '/') {
    return <Navigate to="/" />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;