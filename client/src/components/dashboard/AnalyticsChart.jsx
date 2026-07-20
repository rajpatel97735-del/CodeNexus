import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart() {

  const data = [
    { month: "Jan", projects: 2 },
    { month: "Feb", projects: 4 },
    { month: "Mar", projects: 6 },
    { month: "Apr", projects: 5 },
    { month: "May", projects: 8 },
    { month: "Jun", projects: 10 },
  ];

  return (
    <div className="chart-card">

      <h2>📊 Project Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="projects"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;