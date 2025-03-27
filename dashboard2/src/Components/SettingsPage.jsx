import React, { useState } from 'react';
import { Box, TextField, Button, FormControlLabel, Switch, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const SettingsPage = () => {
  const { control, handleSubmit, formState: { errors }, register } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Settings saved successfully!');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Default Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
    
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email format'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="theme-label">Theme</InputLabel>
          <Controller
            name="theme"
            control={control}
            rules={{ required: 'Please select a theme' }}
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

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }}>
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Box>
  );
};

export default SettingsPage;
