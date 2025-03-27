import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Box, Typography, TextField, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    date: "",
    category: "",
    amount: "",
  });

  const sampleReports = [
    { id: 1, title: "Report 1", date: "2025-03-01", category: "Finance", amount: 500 },
    { id: 2, title: "Report 2", date: "2025-03-05", category: "HR", amount: 300 },
    { id: 3, title: "Report 3", date: "2025-03-10", category: "Sales", amount: 150 },
    { id: 4, title: "Report 4", date: "2025-03-12", category: "Finance", amount: 700 },
    { id: 5, title: "Report 5", date: "2025-03-15", category: "HR", amount: 200 },
  ];

  useEffect(() => {
    setTimeout(() => {
      setReports(sampleReports);
      setFilteredReports(sampleReports);
      setLoading(false);
    }, 500);
  }, []);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterDate(value);

    const filtered = reports.filter((report) =>
      report.date.includes(value) 
    );
    setFilteredReports(filtered);
  };

  const handleNewReportChange = (event) => {
    const { name, value } = event.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleAddReport = () => {
    const newId = reports.length + 1; 
    const reportToAdd = {
      id: newId,
      ...newReport,
    };

    setReports((prevReports) => [...prevReports, reportToAdd]);
    setFilteredReports((prevReports) => [...prevReports, reportToAdd]);
    setOpenAddDialog(false);
    setNewReport({ title: "", date: "", category: "", amount: "" }); 
  };


  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Reports Section</Typography>
      <Box sx={{ my: 3 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Filter by Date"
                  type="date"
                  value={filterDate}
                  onChange={handleFilterChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
                  Add New Report
                </Button>
              </Grid>
            </Grid>

            <Table sx={{ mt: 3 }}>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Amount</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newReport.title}
            onChange={handleNewReportChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newReport.date}
            onChange={handleNewReportChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            name="category"
            value={newReport.category}
            onChange={handleNewReportChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={newReport.amount}
            onChange={handleNewReportChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddReport} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReportsPage;