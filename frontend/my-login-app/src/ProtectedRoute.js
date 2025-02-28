import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  // Retrieve the token and role from localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the user's role doesn't match the required role, redirect to unauthorized
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  // If everything is fine, render the children
  return children;
};

export default ProtectedRoute;

