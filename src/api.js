// src/api.js
import axios from "axios";
import Cookies from "js-cookie";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:4000/api/users/login", {
      email: email.trim(),
      password: password.trim(),
    });
    const { token, user } = response.data;
    Cookies.set("token", token, { expires: 7 }); // Store token in cookies
    localStorage.setItem("user", JSON.stringify(user)); // Optional: store user info
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Set default authorization header for Qaxios
const token = Cookies.get("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
