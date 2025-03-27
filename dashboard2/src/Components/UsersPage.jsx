import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  TextField,
  TablePagination,
} from '@mui/material';
import axios from 'axios';
import UserFormModal from './UserFormModal';

const UsersPage = () => {
  const [users, setUsers] = useState([]); // Fetched users
  const [newUsers, setNewUsers] = useState([]); // Newly added users
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Combined users list for filtering and displaying
  const combinedUsers = [...users, ...newUsers];
  const filteredUsers = combinedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Open Modal for Adding a New User
  const handleAddUser = () => {
    setUserToEdit(null); // Reset the form
    setIsModalOpen(true);
  };

  // Open Modal for Editing an Existing User
  const handleEditUser = (user) => {
    setUserToEdit(user); // Pre-fill the form
    setIsModalOpen(true);
  };

  // Delete a User
  const handleDeleteUser = (userId) => {
    // Check if user belongs to fetched or newly added
    if (userId >= 10000) {
      // Newly added user
      setNewUsers(newUsers.filter((user) => user.id !== userId));
    } else {
      // Fetched user
      setUsers(users.filter((user) => user.id !== userId));
    }
    setSnackbarMessage('User deleted successfully!');
    setSnackbarOpen(true);
  };

  // Handle Add/Edit User Submission
  const handleSubmit = (userData) => {
    if (userToEdit) {
      // Editing a user
      if (userToEdit.id >= 10000) {
        // Update newly added user
        setNewUsers(
          newUsers.map((user) =>
            user.id === userToEdit.id ? { ...user, ...userData } : user
          )
        );
      } else {
        // Update fetched user
        setUsers(
          users.map((user) =>
            user.id === userToEdit.id ? { ...user, ...userData } : user
          )
        );
      }
      setSnackbarMessage('User updated successfully!');
    } else {
      // Adding a new user
      const newUser = { id: Date.now(), ...userData }; // Generate unique ID
      setNewUsers([...newUsers, newUser]);
      setSnackbarMessage('User created successfully!');
    }
    setIsModalOpen(false); // Close modal
    setSnackbarOpen(true); // Show notification
  };

  // Paginated Users
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Add New User Button */}
      <Button variant="contained" onClick={handleAddUser} sx={{ mb: 2 }}>
        Add New User
      </Button>

      {/* Search Users Input */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* User List Table */}
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
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* User Form Modal for Add/Edit */}
      <UserFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        user={userToEdit}
      />

      {/* Snackbar Notification */}
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
