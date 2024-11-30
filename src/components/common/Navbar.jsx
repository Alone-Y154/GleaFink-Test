import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, setBypassMode } from '../../reducers/auth/auth';

const Navbar = () => {
  const { tokenValidationStatus, bypassMode } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleBypass = () => {
    dispatch(setBypassMode());
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1>
          <Link to="/dashboard" className="text-xl font-bold">
            Visualization
          </Link>
        </h1>
        
        {(tokenValidationStatus || bypassMode) ? (
          <ul className="flex space-x-4">
            <li>
              <button 
                onClick={handleLogout} 
                className="hover:underline"
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
          </ul>
        )}
        
        {!tokenValidationStatus && !bypassMode && (
          <button 
            onClick={handleBypass} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Skip Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;