import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../src/lib/context/auth.context'; // Adjust this path based on your project structure

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Include loading state

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login page if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
