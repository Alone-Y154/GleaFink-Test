import React, { useEffect } from 'react';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DynamicForm from "./components/forms/DynamicForm";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import NotFound from './pages/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { /*validateToken,*/ setBypassMode } from './reducers/auth/auth';

function App() {
  const dispatch = useDispatch();
  const { token, bypassMode } = useSelector((state) => state.auth);

  useEffect(()=>{
    console.log('Token in localStorage:', localStorage.getItem('token'));
  },[])
  useEffect(() => {
    // Check bypass mode on app initialization
    const storedBypassMode = localStorage.getItem('bypassMode');
    if (storedBypassMode === 'true' && !bypassMode) {
      dispatch(setBypassMode());
    }
    
    // Only validate token if a token exists and not in bypass mode
    if (token && !bypassMode) {
      // dispatch(validateToken());
    }
  }, [dispatch, token, bypassMode]);

  return (
    <>
    <Navbar />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<DynamicForm isLogin={true} />} />
      <Route path="/signup" element={<DynamicForm isLogin={false} />} />

      {/* Protected Route for Dashboard */}
      <Route element={<ProtectedRoute redirectTo="/" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Optional: 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;