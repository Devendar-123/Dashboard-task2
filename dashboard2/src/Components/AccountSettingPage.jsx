import React, { useState } from "react";

const AccountSettingsPage = () => {
  const [email, setEmail] = useState("devendar.@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Account settings saved");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Account Settings</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ margin: "10px 0", padding: "8px", width: "100%" }}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          style={{ margin: "10px 0", padding: "8px", width: "100%" }}
        />
      </div>
      <div>
        <button onClick={handleSave} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
