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
    // Fetch payments from server
    axios
      .get("/api/payments", { params: filters })
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    // Trigger re-fetch with updated filters
    axios
      .get("/api/payments", { params: filters })
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  };

  const handleReset = () => {
    setFilters({
      plan: "",
      paymentMethod: "",
      paymentStatus: "",
      fromDate: "",
      toDate: "",
    });
    // Trigger re-fetch with reset filters
    axios
      .get("/api/payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  };

  return (
    <div className="payment-history">
      <h3>Payment History</h3>
      <div className="filters">
        <input
          type="text"
          name="plan"
          value={filters.plan}
          placeholder="Plan"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="paymentMethod"
          value={filters.paymentMethod}
          placeholder="Payment Method"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="paymentStatus"
          value={filters.paymentStatus}
          placeholder="Payment Status"
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
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset Filter</button>
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
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.plan}</td>
                <td>${payment.planAmount}</td>
                <td>${payment.discountAmount}</td>
                <td>${payment.totalPayment}</td>
                <td>{payment.paymentMethod}</td>
                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td>{payment.paymentStatus}</td>
                <td>{payment.subscriptionStatus}</td>
                <td>
                  {new Date(payment.subscriptionEndDate).toLocaleDateString()}
                </td>
                <td>{payment.remainingDays}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
