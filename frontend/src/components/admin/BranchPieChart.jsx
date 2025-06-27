import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    async function fetchStudentStats() {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/admin/students/branch-stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const branchCounts = res.data?.data || {};
        const formattedData = Object.entries(branchCounts).map(([branch, count]) => ({
          name: branch,
          value: count,
        }));

        setBranchData(formattedData);
      } catch (err) {
        toast.error("Failed to load branch stats");
        console.error("Error fetching branch stats:", err);
      }
    }

    fetchStudentStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full transition-all">
      <h3 className="text-xl font-sB mb-2 text-center text-gray-800"> Student Distribution by Branch</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={branchData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={40}
            startAngle={0}
            endAngle={360}
            labelLine={false}
            label={renderCustomizedLabel}
            isAnimationActive={true}
            animationDuration={600}
            animationEasing="ease-out"
          >
            {branchData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} Students`, name]}
            contentStyle={{ fontSize: "14px" }}
          />
          <Legend
            verticalAlign="bottom"
            height={24}
            iconSize={12}
            wrapperStyle={{ fontSize: "13px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
