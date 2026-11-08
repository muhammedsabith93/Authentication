
import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.fullName}!</h1>

      <h3>User Profile</h3>

      <p>Username: {user.username}</p>
      <p>Full Name: {user.fullName}</p>
      <p>Email: {user.email}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
