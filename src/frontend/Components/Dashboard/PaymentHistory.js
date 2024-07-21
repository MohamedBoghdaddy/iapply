import React from "react";
import "../styles/Dashboard.css";

const PaymentHistory = () => {
  return (
    <div className="payment-history">
      <h3>Payment History</h3>
      <div className="filters">
        <input type="text" placeholder="Plan" />
        <input type="text" placeholder="Payment Method" />
        <input type="text" placeholder="Payment Status" />
        <input type="date" placeholder="From Date" />
        <input type="date" placeholder="To Date" />
        <button>Search</button>
        <button>Reset Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Plan Amount</th>
            <th>Discount Amount</th>
            <th>Total Payment</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
            <th>Payment Status</th>
            <th>Subscription Status</th>
            <th>Subscription End Date</th>
            <th>Remaining Days</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Premium</td>
            <td>$35</td>
            <td>$0</td>
            <td>$35</td>
            <td>Online</td>
            <td>13-Oct-2023</td>
            <td>Success</td>
            <td>Cancel</td>
            <td>21-Nov-2023</td>
            <td>-1</td>
          </tr>
          <tr>
            <td>Premium</td>
            <td>$35</td>
            <td>$0</td>
            <td>$35</td>
            <td>Online</td>
            <td>13-Oct-2023</td>
            <td>Success</td>
            <td>Cancel</td>
            <td>21-Nov-2023</td>
            <td>-1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
