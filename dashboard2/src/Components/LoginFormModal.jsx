import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const LoginFormModal = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (email === "admin@example.com" && password === "password") {
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 300,
          margin: "auto",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Login
        </Typography>

        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginFormModal;
