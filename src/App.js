import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./frontend/Components/Login/Login";
import Register from "./frontend/Components/Signup/Register";
import Dashboard from "./frontend/Components/Dashboard/Dashboard";
import AdminDashboard from "./frontend/Components/Dashboard/AdminDashboard";
import Notifications from "./frontend/Components/Dashboard/Notifications";
import Home from "./frontend/Components/Home/Home";
import "./frontend/Components/styles/style.css"; // Update the path according to your folder structure

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>{/* Your header content */}</header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
