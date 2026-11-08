
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  async function handleLogin() {
    if (!credentials.email || !credentials.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await login(credentials);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email or password");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Enter email"
        value={credentials.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Enter password"
        value={credentials.password}
        onChange={handleChange}
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
