import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Analytics() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />
<div className="page-container">

<div className="page-header">

<div>

<span className="page-badge">
📈 AI Insights
</span>

<h1 className="page-title">
📊 Analytics
</h1>

<p className="page-subtitle">
Track your projects and AI performance.
</p>

</div>

</div>

<div className="page-grid">

<div className="page-card">
<h2>18</h2>
<p>Total Projects</p>
</div>

<div className="page-card">
<h2>143</h2>
<p>AI Requests</p>
</div>

<div className="page-card">
<h2>98%</h2>
<p>Success Rate</p>
</div>

<div className="page-card">
<h2>2.3s</h2>
<p>Average Response</p>
</div>

</div>

<div className="page-card" style={{marginTop:"25px"}}>

<h3>📈 Weekly Growth</h3>

<div className="fake-chart">

<div style={{height:"55%"}}></div>

<div style={{height:"80%"}}></div>

<div style={{height:"40%"}}></div>

<div style={{height:"95%"}}></div>

<div style={{height:"70%"}}></div>

<div style={{height:"100%"}}></div>

<div style={{height:"65%"}}></div>

</div>

</div>

</div>
      </div>
    </div>
  );
}