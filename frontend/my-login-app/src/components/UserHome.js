import React from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
    const navigate = useNavigate();
 
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const handleLogout = () => { 
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1>Welcome, {username}!</h1>
            <p>This is your user homepage.</p>

            <div className="mt-4">
                <h3>Your Details:</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Token</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userId}</td>
                            <td>{username}</td>
                            <td style={{ wordWrap: "break-word", maxWidth: "300px"  }}>{token}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserHome;