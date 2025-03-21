import React, { useState, useEffect } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar } from '@mui/material';

import axios from 'axios';
import UserFormModal from './UserFormModal';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch users from an API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users ');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setUserToEdit(null); // Clear the user to edit for adding a new one
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId)); // Remove the deleted user from the state
      setSnackbarMessage('User deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Error deleting user');
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (userData) => {
    try {
      if (userToEdit) {
        // Update user
        await axios.put(`https://jsonplaceholder.typicode.com/users/${userToEdit.id}`, userData);
        setUsers(users.map((user) => (user.id === userToEdit.id ? { ...user, ...userData } : user)));
        setSnackbarMessage('User updated successfully!');
      } else {
        // Create new user
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
        setUsers([...users, response.data]);
        setSnackbarMessage('User created successfully!');
      }
      setIsModalOpen(false); // Close the modal after submission
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving user:', error);
      setSnackbarMessage('Error saving user');
      setSnackbarOpen(true);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Button variant="contained" onClick={handleAddUser} sx={{ mb: 2 }}>
        Add New User
      </Button>
      <Paper sx={{ mt: 3, p: 3 }}>
        <h2>User List</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <UserFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        user={userToEdit}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default UsersPage;
