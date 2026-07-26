import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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

      <div className="chart-header">

        <div>

  <h2>📊 Project Analytics</h2>

  <p>Projects created in the last 6 months</p>

  <div className="chart-stats">

      <span>📂 35 Projects</span>

      <span>🚀 +18% Growth</span>

      <span>⚡ Active</span>

  </div>

</div>

      <button className="chart-btn">
    📄 View Report
</button>

      </div>

      <ResponsiveContainer
        width="100%"
        height={260}
      >
        <BarChart data={data}>
          <defs>

  <linearGradient
      id="barGradient"
      x1="0"
      y1="0"
      x2="0"
      y2="1"
  >

      <stop
          offset="0%"
          stopColor="#7c3aed"
      />

      <stop
          offset="100%"
          stopColor="#2563eb"
      />

  </linearGradient>

</defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f2937"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

         <Tooltip

contentStyle={{

background:"#111827",

border:"1px solid #334155",

borderRadius:"12px",

}}

cursor={{

fill:"rgba(255,255,255,.04)"

}}

/>

          <Bar
            dataKey="projects"
            radius={[8, 8, 0, 0]}
           fill="url(#barGradient)"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;