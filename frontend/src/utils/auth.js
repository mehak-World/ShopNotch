// src/utils/auth.js
import axios from 'axios';

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/login", { username, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      return { success: true };
    } else {
      return { success: false, message: response.data.message || "Login failed" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    if (error.response) {
      return { success: false, message: error.response.data.message || "An error occurred" };
    } else {
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

// Signup function
export const signup = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/signup", { username, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      return { success: true };
    } else {
      return { success: false, message: response.data.message || "Signup failed" };
    }
  } catch (error) {
    console.error("Error during signup:", error);
    if (error.response) {
      return { success: false, message: error.response.data.message || "An error occurred" };
    } else {
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await axios.get("http://localhost:8080/logout");
    if (response.data.success) {
      localStorage.removeItem('token');
      return { success: true };
    } else {
      return { success: false, message: "Logout failed" };
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
};
