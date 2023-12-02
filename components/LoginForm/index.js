import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";

import React, { useState } from "react";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    // @TODO - implement the login later.
    // try {
    //   const response = await fetch("/api/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (response.ok) {
    //     const newUser = await response.json();
    //     console.log("New user created:", newUser);
    //     setEmail("");
    //     setPassword("");
    //     setError(null);
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.error || "An error occurred");
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    //   setError("An unexpected error occurred");
    // }
  };

  return (
    <div className={styles.LoginForm}>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        onClick={handleLogin}
        variant="contained"
        style={{ margin: "0 auto" }}
      >
        Login
      </Button>
    </div>
  );
}
