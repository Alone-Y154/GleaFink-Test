// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-xl mb-4">The page you are looking for does not exist.</p>
          <Link 
            to="/" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  };

export default NotFound