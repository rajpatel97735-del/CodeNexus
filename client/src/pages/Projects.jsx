import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/page.css";

export default function Projects() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-container">
          <div className="page-header">
            <div>
          <div>

<span className="page-badge">

🚀 Workspace

</span>

<h1 className="page-title">

📂 Projects

</h1>

<p className="page-subtitle">

Create, manage and deploy your AI websites.

</p>

</div>
<div className="project-toolbar">

<input

placeholder="🔍 Search Projects"

/>

<select>

<option>Latest</option>

<option>Name</option>

<option>Oldest</option>

</select>

</div>
            </div>

            <button className="primary-btn">
              + New Project
            </button>
          </div>

          <div className="page-grid">

          <div className="page-card">

<div className="project-top">

<div>

<h3>

🌐 Restaurant Website

</h3>

<p>

Responsive • React • AI Generated

</p>

</div>

<span className="status live">

Live

</span>

</div>

<div className="project-footer">

<span>

Updated 2 hours ago

</span>

<div>

<button>

✏ Open

</button>

<button>

🚀 Deploy

</button>

</div>

</div>

</div>
<span className="progress">

100%

</span>

            <div className="page-card">
              <h3>💼 Portfolio</h3>
              <p>Updated Yesterday</p>
            </div>

            <div className="page-card">
              <h3>🛒 Ecommerce Store</h3>
              <p>Updated 3 days ago</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}