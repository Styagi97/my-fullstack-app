import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Login";
import UserHome from "./UserHome";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute"; 


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