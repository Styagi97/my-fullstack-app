import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/Login";
import UserHome from "./components/UserHome";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; 


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} /> 
                <Route
                    path="/userhome"
                    element={
                        <ProtectedRoute role="USER">
                            <UserHome />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />
            </Routes>
        </Router>
    );
};

export default App;