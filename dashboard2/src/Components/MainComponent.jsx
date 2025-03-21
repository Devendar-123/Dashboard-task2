import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box, Typography, LinearProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock data for the chart
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Registrations',
        data: [10, 20, 15, 30, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">User Registrations Trend</Typography>
              <Line data={chartData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Sales Progress</Typography>
              <LinearProgress variant="determinate" value={70} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MainComponent;
