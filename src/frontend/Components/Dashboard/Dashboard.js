import React from "react";
import Notification from "./Notification.js";
import "../styles/Dashboard.css";
import Sidebar from "../Dashboard/Sidebar.js";
const Dashboard = () => {
  return (
    <div>
      {/* <Sidebar /> */}

      <div className="main">
        <div className="main-top">
          <h1>Dashboard</h1>
          <span className="material-symbols-rounded">account_circle</span>
        </div>
        <div className="users">
          <div className="card">
            <span className="material-symbols-rounded">trending_up</span>
            <span className="nav-item">Income</span>
            <h4>9380$</h4>
            <p>Objective Income</p>
            <div className="per">
              <table>
                <thead>
                  <tr>
                    <td>
                      <span>85%</span>
                    </td>
                    <td>
                      <span>87%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Monthly</td>
                    <td>Yearly</td>
                  </tr>
                </thead>
              </table>
            </div>
            <button>View</button>
          </div>
          <div className="card">
            <span className="material-symbols-rounded">chat</span>
            <span className="nav-item">Message</span>
            <h4>5 New Messages</h4>
            <div className="per">
              <table>
                <thead>
                  <tr>
                    <td>
                      <span className="sender">Dr. Ayman Ali:</span>
                    </td>
                    <td>
                      <span className="message">Hi Doctor</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="sender">Omar Ahmed:</span>
                    </td>
                    <td>
                      <span className="message">
                        Hello Doctors, Thank you for the vaccination for my dog
                      </span>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <h4>+3 More</h4>
            <button>More Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
