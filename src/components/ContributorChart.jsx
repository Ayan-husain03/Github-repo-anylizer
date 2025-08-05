import React from "react";
import { useGithubStore } from "../store/githubStore";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Users } from "lucide-react";

function ContributorChart() {
  const contributors = useGithubStore((state) => state.contributors);

  if (!contributors || contributors.length === 0) return null;

  const topContributors = contributors
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 5)
    .map((item) => ({
      name: item.login,
      contributions: item.contributions,
    }));

  return (
    <div className="w-full shadow-xl mx-auto md:px-6 lg:px-8">
      <div className="bg-white overflow-hidden shadow-lg md:rounded-xl">
        <div className="flex items-center gap-3 mb-4 bg-amber-300/10 p-5">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
            <Users className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Top Contributors
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topContributors}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#ddd" }}
            />
            <Bar
              dataKey="contributions"
              fill="#6366f1"
              barSize={32}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ContributorChart;
