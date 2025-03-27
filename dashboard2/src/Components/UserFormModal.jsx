import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const UserFormModal = ({ open, onClose, onSubmit, user = null }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset(user);  
    }
  }, [user, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register('name', { required: true })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', { required: true })}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onFormSubmit)} variant="contained">Save</Button>
      </DialogActions>
      
    </Dialog>
  );
};

export default UserFormModal;
