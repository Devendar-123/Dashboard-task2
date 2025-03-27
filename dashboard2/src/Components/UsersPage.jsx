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
  TableSortLabel,
} from '@mui/material';
import axios from 'axios';
import UserFormModal from './UserFormModal';

const UsersPage = () => {
  const [users, setUsers] = useState([]); 
  const [newUsers, setNewUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc'); 
  const [orderBy, setOrderBy] = useState('name'); 

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

  
  const combinedUsers = [...users, ...newUsers];
  const filteredUsers = combinedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const handleAddUser = () => {
    setUserToEdit(null); 
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user); 
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (userId >= 10000) {
      setNewUsers(newUsers.filter((user) => user.id !== userId));
    } else {
      setUsers(users.filter((user) => user.id !== userId));
    }
    setSnackbarMessage('User deleted successfully!');
    setSnackbarOpen(true);
  };

  const handleSubmit = (userData) => {
    if (userToEdit) {
      if (userToEdit.id >= 10000) {
        setNewUsers(
          newUsers.map((user) =>
            user.id === userToEdit.id ? { ...user, ...userData } : user
          )
        );
      } else {
        setUsers(
          users.map((user) =>
            user.id === userToEdit.id ? { ...user, ...userData } : user
          )
        );
      }
      setSnackbarMessage('User updated successfully!');
    } else {
      const newUser = { id: Date.now(), ...userData };
      setNewUsers([...newUsers, newUser]);
      setSnackbarMessage('User created successfully!');
    }
    setIsModalOpen(false);
    setSnackbarOpen(true);
  };

  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Button variant="contained" onClick={handleAddUser} sx={{ mb: 2 }}>
        Add New User
      </Button>

      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Paper sx={{ mt: 3, p: 3 }}>
        <h2>User List</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
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
