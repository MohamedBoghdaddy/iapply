import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import DashboardProvider from "./context/DashboardContext";
import axios from "axios";
import Cookies from "js-cookie";
// Create a root container
const container = document.getElementById("root");
const root = createRoot(container);

// Set default authorization header for axios
const token = Cookies.get("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


// Render the App component
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
