import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./frontend/Components/LoginSystem/Login/Login";
import Signup from "./frontend/Components/LoginSystem/Signup/signup";
import Dashboard from "./frontend/Components/Dashboard/Dashboard";
import Profile from "./frontend/Components/Dashboard/Profile";
import ApplyToJobs from "./frontend/Components/Dashboard/ApplyToJobs";
import Sidebar from "./frontend/Components/Dashboard/Sidebar";
// import { DashboardProvider } from "./context/DashboardContext";

import JobHistory from "./frontend/Components/Dashboard/JobHistory";
import PaymentHistory from "./frontend/Components/Dashboard/PaymentHistory";
import AccountSettings from "./frontend/Components/Dashboard/AccountSettings";
import AdminDashboard from "./frontend/Components/AdminDashboard/AdminDashboard";
import Notifications from "./frontend/Components/AdminDashboard/Notifications";
import Home from "./frontend/Components/Home/Home";
import Footer from "./frontend/Components/Home/Footer";
import Contact from "./frontend/Components/contact/contact";
import NavBar from "./frontend/Components/Home/NavBar";
import Mininavbar from "./frontend/Components/Home/Mininavbar";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Mininavbar />
              <Sidebar />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/Profile"
          element={
            <>
              <Mininavbar />
              <Sidebar />
              <Profile />
              <Footer />
            </>
          }
        />
        <Route
          path="/AccountSettings"
          element={
            <>
              <Mininavbar />
              <Sidebar />
              <AccountSettings />
              <Notifications/>
              <Footer />
            </>
          }
        />
        <Route
          path="/JobHistory"
          element={
            <>
              <Mininavbar />
              <Sidebar />
              <JobHistory />
              <ApplyToJobs />
              <Footer />
            </>
          }
        />
        <Route
          path="/PaymentHistory"
          element={
            <>
              <Mininavbar />
              <Sidebar />
              <PaymentHistory />
              <Footer />
            </>
          }
        />
        <Route />
        <Route
          path="/login"
          element={
            <>
              <Mininavbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Mininavbar />
              <Signup />
              <Footer />
            </>
          }
        />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route
          path="/contact"
          element={
            <>
              <Mininavbar />
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
