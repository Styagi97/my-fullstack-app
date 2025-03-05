import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditUserDialog from "./EditUserDialog";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: null,  
    username: "",
    email: "",
    roles: []
  });
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = "USER";
      const response = await fetch(`http://localhost:8080/auth/users?role=${role}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/auth/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      setUsers(users.map((user) => (user.id === data.id ? data : user)));
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async (userId) => {
      // Ask for confirmation
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) {
    return; // Exit if the user cancels the deletion
  }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Admin {username}</h1>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2 className="tableHeader">Users List</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="tableHeaderCell">ID</th>
            <th className="tableHeaderCell">Username</th>
            <th className="tableHeaderCell">Email</th>
            <th className="tableHeaderCell">Roles</th>
            <th className="tableHeaderCell">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="tableRow">
              <td className="tableCell">{user.id}</td>
              <td className="tableCell">{user.username}</td>
              <td className="tableCell">{user.email}</td>
              <td className="tableCell">{user.roles?.join(", ")}</td>
              <td className="tableCell">
                <button className="editButton" onClick={() => handleEditClick(user)}>
                  Edit
                </button>
                <button className="deleteButton" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditUserDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default AdminDashboard;