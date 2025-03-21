import React, { useState } from 'react';
import { Box, TextField, Button, FormControlLabel, Switch, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema using Yup
const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  theme: yup.string().required('Please select a theme'),
  emailNotifications: yup.boolean(),
  smsNotifications: yup.boolean(),
}).required();


const SettingsPage = () => {
  const { control, handleSubmit, formState: { errors },register } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call to save settings
    setTimeout(() => {
      alert('Settings saved successfully!');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        
        {/* Email */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        
        {/* Theme Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="theme-label">Theme</InputLabel>
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="theme-label"
                label="Theme"
                error={!!errors.theme}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            )}
          />
          {errors.theme && <p style={{ color: 'red' }}>{errors.theme.message}</p>}
        </FormControl>

        {/* Notification Preferences */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="emailNotifications"
                  control={control}
                  render={({ field }) => <Switch {...field} />}
                />
              }
              label="Email Notifications"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="smsNotifications"
                  control={control}
                  render={({ field }) => <Switch {...field} />}
                />
              }
              label="SMS Notifications"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }}>
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Box>
  );
};

export default SettingsPage;
