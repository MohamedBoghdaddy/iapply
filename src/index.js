import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
