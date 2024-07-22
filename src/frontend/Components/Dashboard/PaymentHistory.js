import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    plan: "",
    paymentMethod: "",
    paymentStatus: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    axios
      .get("/api/payments", { params: filters })
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="payment-history">
      <h1>Payment History</h1>
      <div className="filters">
        <input
          type="text"
          name="plan"
          placeholder="Plan"
          value={filters.plan}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={filters.paymentMethod}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="paymentStatus"
          placeholder="Payment Status"
          value={filters.paymentStatus}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleFilterChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.plan}</td>
              <td>{payment.planAmount}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentStatus}</td>
              <td>{payment.paymentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
