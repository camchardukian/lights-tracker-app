import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import React, { useState } from "react";

export default function CreateUserForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      } else {
        const newUser = await response.json();
        console.log("New user created:", newUser);
        setName("");
        setEmail("");
        setPassword("");
        setError(null);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <h2>Create User Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleCreateUser}
        variant="contained"
        style={{ margin: "0 auto" }}
      >
        Create User
      </Button>
    </div>
  );
}