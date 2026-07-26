import {
  ArrowUpRight,
} from "lucide-react";

function StatCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div
          className="stat-icon"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          color="#94a3b8"
        />

      </div>

      <h4>{title}</h4>

      <h1>{value}</h1>

      <div className="stat-footer">
        <span>Updated just now</span>
      </div>

    </div>
  );
}

export default StatCard;
