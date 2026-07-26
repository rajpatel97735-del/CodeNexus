import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Billing() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div style={{ padding: "30px", color: "white" }}>
          <h1>💳 Billing</h1>
          <p>Billing dashboard coming soon...</p>
        </div>
      </div>
    </div>
  );
}