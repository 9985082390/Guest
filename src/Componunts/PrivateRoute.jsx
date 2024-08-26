import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext'; // Adjust the path based on your project

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useUser(); // Adjust based on your context
  const location = useLocation();

  // If the user is authenticated, render the component; otherwise, redirect to login
  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateRoute;


