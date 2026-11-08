
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { checkUsername } from "../services/authApi";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleRegister() {
    if (!user.username || !user.fullName || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    if (user.username.length < 3 || user.username.length > 20) {
      alert("Username must be 3-20 characters");
      return;
    }

    if (user.fullName.trim().length < 2) {
      alert("Enter a valid full name");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      alert("Enter a valid email");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    try {
      const exists = await checkUsername(user.username);

      if (exists) {
        alert("Username already exists!");
        return;
      }

      await register({
        ...user,
        createdAt: new Date().toISOString(),
        avatar: "",
      });

      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
  console.log("Registration Error:", error);
  console.log("Error details:", error.response?.data);
  alert(error.message);
}
  }

  return (
    <div>
      <h2>Register</h2>

      <input
        name="username"
        value={user.username}
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        name="fullName"
        value={user.fullName}
        placeholder="Full name"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        value={user.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        value={user.password}
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="button" onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
