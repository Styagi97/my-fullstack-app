import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
     
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
 
  if (!token) {
    return <Navigate to="/" />;
  }

   if (role && userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }
 
  return children;
};

export default ProtectedRoute;

