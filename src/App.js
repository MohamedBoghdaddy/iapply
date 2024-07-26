import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./frontend/Components/LoginSystem/Login/Login";
import Signup from "./frontend/Components/LoginSystem/Signup/signup";
import Dashboard from "./frontend/Components/Dashboard/Dashboard";
import Profile from "./frontend/Components/Dashboard/Profile";
import ApplyToJobs from "./frontend/Components/Dashboard/ApplyToJobs";
import Sidebar from "./frontend/Components/Dashboard/Sidebar";
// import { DashboardProvider } from './context/DashboardContext';
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
              <Dashboard />
              <Sidebar/>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Mininavbar />
              <Profile />
            </>
          }
        />
        <Route
          path="/JobHistory"
          element={
            <>
              <Mininavbar />
              <JobHistory />
              <ApplyToJobs />
            </>
          }
        />
        <Route
          path="/ApplyToJobs "
          element={
            <>
              <Mininavbar />
              <ApplyToJobs />
            </>
          }
        />
        <Route
          path="/PaymentHistory"
          element={
            <>
              <Mininavbar />
              <PaymentHistory />
            </>
          }
        />
        <Route
          path="/AccountSettings"
          element={
            <>
              <Mininavbar />
              <AccountSettings />
            </>
          }
        />
        <Route
          path="/Notifications"
          element={
            <>
              <Mininavbar />
              <Notifications />
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
