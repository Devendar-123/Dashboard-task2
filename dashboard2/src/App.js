import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/Topbar';
import DashboardPage from './Components/DashboardPage';
import UsersPage from './Components/UsersPage';
import ReportsPage from './Components/ReportsPage';
import SettingsPage from './Components/SettingsPage';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <TopBar />
          <Box component="main" sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
