import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

// Sample data (replace with your real data)
const data = {
  labels: [
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ],
  datasets: [
    {
      label: "Applications",
      data: [15, 22, 30, 25, 35, 40, 38],
      fill: true, // For gradient under the line
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          // This case happens on initial chart render
          return null;
        }
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(60,137,201,0.2)");
        gradient.addColorStop(1, "rgba(35,87,130,0)");
        return gradient;
      },
      borderColor: "#3C89C9",
      borderWidth: 3,
      tension: 0.5, // Makes the line curvy
      pointRadius: 5,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#3C89C9",
      pointHoverRadius: 7,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowBlur: 10,
      shadowColor: "rgba(60,137,201,0.3)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#3C89C9",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#235782",
        font: { size: 14, weight: "bold" },
      },
    },
    y: {
      grid: {
        color: "rgba(60,137,201,0.08)",
      },
      ticks: {
        color: "#235782",
        font: { size: 14, weight: "bold" },
        stepSize: 5,
      },
    },
  },
};

export default function LineChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 font-sB">
      <h3 className="text-lg mb-4">Students Enrolled Over Time</h3>
      <Line data={data} options={options} height={40} />
    </div>
  );
}
