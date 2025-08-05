import React from "react";
import { useGithubStore } from "../store/githubStore";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function Languages() {
  const languages = useGithubStore((state) => state.languages);
  if (!languages) return null;
  const COLORS = ["#0088FE", "#00C49F", "#FB4141", "#FF8042", "#640D5F"];
  // console.log(Object.entries(languages));
  const data = Object.entries(languages).map(([name, value]) => ({
    name,
    value,
  }));
  // const renderCustomizeLabel = ({ percent, name }) => {
  //   if (percent < 0.05) return "";
  //   return <text fill="white" dominantBaseline="centr" >{`${name} ${(percent * 100).toFixed(1)}%`}</text>;
  // };
  return (
    <div className="mx-auto md:px-6 w-full h-full py-8">
      <div className="bg-white md:rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Languages</h3>
              <p className="text-gray-600">Code distribution breakdown</p>
            </div>
          </div>
        </div>

        <div className="md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 gap-2 items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={100}
                  paddingAngle={2}
                  // label={renderCustomizeLabel}
                  labelLine={false}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    padding: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {data.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-semibold text-gray-900">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {(
                      (item.value /
                        Object.values(languages).reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Languages;
