import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, LinearProgress, CircularProgress, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line } from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";

const userRegistrationData = [
  { name: "Jan", registrations: 400 },
  { name: "Feb", registrations: 600 },
  { name: "Mar", registrations: 800 },
  { name: "Apr", registrations: 700 },
  { name: "May", registrations: 900 },
  { name: "Jun", registrations: 1000 },
];

const initialSalesPerformanceData = [
  { name: "Jan", sales: 3000 },
  { name: "Feb", sales: 5000 },
  { name: "Mar", sales: 4000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 5500 },
  { name: "Jun", sales: 6000 },
];

const pieChartData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MainComponent = () => {
  const [salesData, setSalesData] = useState(initialSalesPerformanceData);
  const [syncProgress, setSyncProgress] = useState(0);
  const [orderProcessing, setOrderProcessing] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData((prevData) => {
        const lastMonth = prevData[prevData.length - 1];
        const newMonth = {
          name: `Jul`,
          sales: lastMonth.sales + Math.floor(Math.random() * 500),
        };
        return [...prevData, newMonth];
      });
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (syncProgress < 100) {
      const interval = setInterval(() => {
        setSyncProgress((prev) => prev + 20);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => setLoading(false), 1000); 
    }
  }, [syncProgress]);

  useEffect(() => {
    if (orderProcessing < 100) {
      const interval = setInterval(() => {
        setOrderProcessing((prev) => prev + 10);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [orderProcessing]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress size={80} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Loading...
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">User Registration Trends</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userRegistrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registrations" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Sales Performance</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Product Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" outerRadius={80} fill="#8884d8">
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <PieTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>Syncing Data (Linear Progress)</Typography>
              <LinearProgress variant="determinate" value={syncProgress} sx={{ marginBottom: 2 }} />
              <Typography variant="body2">{syncProgress}% Completed</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>Processing Orders (Circular Progress)</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
                <CircularProgress variant="determinate" value={orderProcessing} />
              </Box>
              <Typography variant="body2" sx={{ textAlign: "center" }}>{orderProcessing}% Completed</Typography>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default MainComponent;
