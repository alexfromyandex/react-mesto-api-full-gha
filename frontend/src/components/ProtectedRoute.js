import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedin ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
