
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Check username
export const checkUsername = async (username) => {
  const response = await api.get("/users", {
    params: { username },
  });

  return response.data.length > 0;
};

// Register user
export const registerUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// Login user
export const loginUser = async ({ email, password }) => {
  const response = await api.get("/users", {
    params: { email },
  });

  const user = response.data.find(
    (item) => item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};

// Fetch single user
export const fetchUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export default api;
