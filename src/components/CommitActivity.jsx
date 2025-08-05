import React from "react";
import { useGithubStore } from "../store/githubStore";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

function CommitActivity() {
  const commitActivity = useGithubStore((state) => state.commitActivity);
  // console.log("commitActivity value:", commitActivity);
  if (!Array.isArray(commitActivity) || commitActivity.length === 0) {
    return (
      <div className="w-full mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl h-full flex flex-col items-center justify-center p-8 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No commit activity found</p>
        </div>
      </div>
    );
  }
  const data = commitActivity
    .map((item) => ({
      week: new Date(item.week * 1000).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      commits: item.total,
    }))
    .filter((item) => item.commits > 0);
  return (
    <div>
      <div className="mx-auto md:px-6 md:py-8 w-full h-full">
        <div className="bg-white md:rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-9">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Commit Activity
                </h3>
                <p className="text-gray-600">Weekly contribution timeline</p>
              </div>
            </div>
          </div>

          <div className="">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="week"
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: "#6b7280" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    padding: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 1, r: 6 }}
                  activeDot={{ r: 8, fill: "#059669" }}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommitActivity;
