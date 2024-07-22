// components/JobAppliedChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import "../styles/Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobAppliedChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Jobs Applied",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Jobs Applied Overview</h3>
      <div className="chart">
        {" "}
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: false, // Title moved to header
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default JobAppliedChart;
