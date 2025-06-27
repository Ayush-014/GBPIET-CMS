import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { HiUserGroup } from "react-icons/hi";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444",
  "#6366F1", "#EC4899", "#14B8A6", "#8B5CF6"
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#1F2937" textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export default function BranchPieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchBranchStats() {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/admin/students/branch-stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data?.data || {};
        const branches = Object.keys(data);
        const counts = Object.values(data);

        setChartData({
          labels: branches,
          datasets: [
            {
              label: "Students",
              data: counts,
              backgroundColor: COLORS,
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching branch stats:", error);
        toast.error("Failed to load branch stats");
      }
    }

    fetchBranchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h3 className="text-lg font-sB mb-4 text-gray-800 flex items-center justify-left gap-2">
            <HiUserGroup className="text-[#3C89C9]" size={20} />
            Student Distribution by Branch
        </h3>

        {chartData ? (
            <div className="relative w-full h-[240px]">
            <Pie
                data={chartData}
                options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    position: "bottom",
                    labels: {
                        font: { size: 10 },
                    },
                    },
                    tooltip: {
                    callbacks: {
                        label: function (context) {
                        const value = context.parsed;
                        return `${value} Students`;
                        },
                    },
                    },
                },
                animation: {
                    animateRotate: true,
                    duration: 800,
                    easing: "easeOutQuart"
                },
                }}
            />
            </div>
        ) : (
            <div className="text-center text-gray-500 mt-10">Loading chart...</div>
        )}
    </div>
  );
}
