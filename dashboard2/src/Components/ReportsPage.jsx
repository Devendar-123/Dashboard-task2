import React from 'react';
import { Paper, Typography } from '@mui/material';

const ReportsPage = () => {
  return (
    <div>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Reports Section</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This section will display various reports, such as sales reports, user activity, etc.
        </Typography>
      </Paper>
    </div>
  );
};

export default ReportsPage;
