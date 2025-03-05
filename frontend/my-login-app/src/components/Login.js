import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
        setError("");
    };

    const validationSchema = Yup.object({
        username: isLogin
                ? Yup.string().notRequired()
                : Yup.string().min(3, "Too short!").required("Username is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: isLogin
                ? Yup.string().notRequired()
                : Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        role: isLogin
                ? Yup.string().notRequired()
                : Yup.string().oneOf(["USER", "ADMIN"], "Invalid role").required("Role is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                setError("");

                const endpoint = isLogin
                        ? "http://localhost:8080/auth/login"
                        : "http://localhost:8080/auth/register";

                const payload = isLogin
                        ? {email: values.email, password: values.password}
                : {...values, roles: [values.role]};

                const response = await axios.post(endpoint, payload);

                if (isLogin) {
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.roles[0]);
                    localStorage.setItem("username", response.data.username);

                    // Redirect based on role
                    if (response.data.roles[0] === "ADMIN") {
                        navigate("/dashboard");
                    } else {
                        navigate("/userhome");
                    }
                } else {
                    alert("Registration successful! Please login.");
                    setIsLogin(true);
                }

                resetForm();
                setError("");
            } catch (error) {
                if (error.response) {
                    // Handle specific error cases for login
                    if (isLogin) {
                        if (error.response.status === 404) {
                            setError("Incorrect email. User not found.");
                        } else if (error.response.status === 401) {
                            setError("Incorrect password. Please try again.");
                        } else if (error.response.status === 400) {
                            setError(error.response.data || "Invalid request. Please check your input.");
                        } else {
                            setError(error.response.data.message || "An error occurred. Please try again.");
                        }
                    } else {
                        // Handle registration errors
                        if (error.response.status === 409) {
                            setError("User already exists. Please use a different email.");
                        } else {
                            setError(error.response.data.message || "An error occurred. Please try again.");
                        }
                    }
                } else if (error.request) {
                    setError("Network error. Please check your internet connection.");
                } else if (error.code === "ECONNABORTED") {
                    setError("Request timed out. Please try again.");
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            } finally {
                setLoading(false);
        }
        }
    });

    return (
            <div className="container mt-5">
                <h2>{isLogin ? "Login" : "Register"}</h2>
            
                {error && <p className="error alert alert-danger">{error}</p>}
            
            
                <form onSubmit={formik.handleSubmit}>
                    {!isLogin && (
                                    <div className="mb-3">
                                        <label className="form-label">Username:</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            {...formik.getFieldProps("username")}
                                            />
                                        {formik.touched.username && formik.errors.username && (
                                                                <p className="error text-danger">{formik.errors.username}</p>
                                                            )}
                                    </div>
                                        )}
            
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            {...formik.getFieldProps("email")}
                            />
                        {formik.touched.email && formik.errors.email && (
                            <p className="error text-danger">{formik.errors.email}</p>
                                    )}
                    </div>
            
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            {...formik.getFieldProps("password")}
                            />
                        {formik.touched.password && formik.errors.password && (
                            <p className="error text-danger">{formik.errors.password}</p>
                                    )}
                    </div>
            
                    {!isLogin && (
                            <div className="mb-3">
                                <label className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    {...formik.getFieldProps("confirmPassword")}
                                    />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                <p className="error text-danger">{formik.errors.confirmPassword}</p>
                                                    )}
                            </div>
                                )}
            
                    {!isLogin && (
                            <div className="mb-3">
                                <label className="form-label">Role:</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    >
                                    <option value="">Select</option>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                {formik.touched.role && formik.errors.role && (
                                                        <p className="error text-danger">{formik.errors.role}</p>
                                                            )}
                            </div>
                                )}
            
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                            <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                            </>
                                    ) : (
                                    isLogin ? "Login" : "Register"
                                    )}
                    </button>
                </form>
            
                <div className="mt-3">
                    <button onClick={toggleForm} className="btn btn-link">
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>
            
                <div className="mt-3">
                    <Link to="/forgot-password" className="btn btn-link">
                    Forgot Password?
                    </Link>
                </div>
            </div>
            );
};

export default AuthForm;