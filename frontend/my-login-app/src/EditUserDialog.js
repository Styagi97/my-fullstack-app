import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditUserDialog = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    roles: []
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        username: user.username || "",
        email: user.email || "",
        roles: user.roles || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave({
      ...editedUser,
      id: user.id, // Ensure the user ID is included
        roles: editedUser.roles
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          name="username"
          value={editedUser.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Roles"
          name="roles"
          value={editedUser.roles.join(", ")}
          onChange={(e) => {
            setEditedUser((prev) => ({
              ...prev,
              roles: e.target.value.split(",").map((role) => role.trim())
            }));
          }}
          fullWidth
          margin="normal"
          helperText="Enter roles separated by commas"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;