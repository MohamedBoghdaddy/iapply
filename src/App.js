import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./frontend/Components/LoginSystem/Login/Login";
import Signup from "./frontend/Components/LoginSystem/Signup/signup";
import Dashboard from "./frontend/Components/Dashboard/Dashboard";
import Profile from "./frontend/Components/Dashboard/Profile";
import ApplyToJobs from "./frontend/Components/Dashboard/ApplyToJobs";
import Sidebar from "./frontend/Components/Dashboard/Sidebar";
import JobHistory from "./frontend/Components/Dashboard/JobHistory";
import PaymentHistory from "./frontend/Components/Dashboard/PaymentHistory";
import AccountSettings from "./frontend/Components/Dashboard/AccountSettings";
import Notifications from "./frontend/Components/Dashboard/Notification";
import Home from "./frontend/Components/Home/Home";
import Footer from "./frontend/Components/Home/Footer";
import NavBar from "./frontend/Components/Home/NavBar";
import Mininavbar from "./frontend/Components/Home/MiniNavBar";
import EmployeeList from "./frontend/Components/Dashboard/employeelist";
// import EmployeeList from "./frontend/Components/Admin/employeelist";
// import AdminProfile from "./frontend/Components/Admin/AdminProfile";
// import AdminSidebar from "./frontend/Components/Admin/AdminSidebar";
// import AdminDashboard from "./frontend/Components/Admin/AdminDashboard";
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
          path="/Dashboard"
          element={
            <>
              <Mininavbar />
              <Dashboard />
              <Sidebar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Mininavbar />
              <Profile />
              <Sidebar />
            </>
          }
        />
        <Route
          path="/JobHistory"
          element={
            <>
              <Mininavbar />
              <JobHistory />
              <Sidebar />
            </>
          }
        />
        <Route
          path="/EmployeeList"
          element={
            <>
              <Mininavbar />
              <EmployeeList />
              <Sidebar />
            </>
          }
        />
        {/* <Route
          path="/AdminProfile"
          element={
            <>
              <Mininavbar />
              <AdminProfile />
              <AdminSidebar />
            </>
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <>
              <Mininavbar />
              <AdminDashboard />
              <Sidebar />
            </>
          } 
        />*/}

        <Route
          path="/ApplyToJobs"
          element={
            <>
              <Mininavbar />
              <ApplyToJobs />
              <Sidebar />
            </>
          }
        />
        <Route
          path="/PaymentHistory"
          element={
            <>
              <Mininavbar />
              <PaymentHistory />
              <Sidebar />
            </>
          }
        />
        <Route
          path="/AccountSettings"
          element={
            <>
              <Mininavbar />
              <AccountSettings />
              <Sidebar />
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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
