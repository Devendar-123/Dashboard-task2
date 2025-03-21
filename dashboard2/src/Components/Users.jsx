import React from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

const Users = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            fullWidth
            {...register('name', { required: true })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            {...register('email', { required: true })}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Save User
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Users;
