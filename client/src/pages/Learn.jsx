import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/page.css";

import {
  BookOpen,
  Code2,
  Laptop,
  Database,
  Brain,
  GraduationCap,
} from "lucide-react";

const courses = [
  {
    title: "HTML & CSS",
    icon: <BookOpen size={28} />,
    lessons: "24 Lessons",
    progress: 80,
  },
  {
    title: "JavaScript",
    icon: <Code2 size={28} />,
    lessons: "35 Lessons",
    progress: 60,
  },
  {
    title: "React.js",
    icon: <Laptop size={28} />,
    lessons: "28 Lessons",
    progress: 30,
  },
  {
    title: "Node & Express",
    icon: <Database size={28} />,
    lessons: "22 Lessons",
    progress: 10,
  },
  {
    title: "AI Development",
    icon: <Brain size={28} />,
    lessons: "18 Lessons",
    progress: 5,
  },
  {
    title: "System Design",
    icon: <GraduationCap size={28} />,
    lessons: "20 Lessons",
    progress: 0,
  },
];

export default function Learn() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-container">
          <div className="page-header">
            <div>
              <h1 className="page-title">📚 Learn</h1>
              <p className="page-subtitle">
                Learn modern web development and AI with interactive courses.
              </p>
            </div>
          </div>

          <div className="page-grid">
            {courses.map((course) => (
              <div className="page-card" key={course.title}>
                <div style={{ marginBottom: "15px" }}>
                  {course.icon}
                </div>

                <h3>{course.title}</h3>

                <p
                  style={{
                    color: "#94a3b8",
                    margin: "10px 0",
                  }}
                >
                  {course.lessons}
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "#334155",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: `${course.progress}%`,
                      height: "100%",
                      background: "#7c3aed",
                    }}
                  />
                </div>

                <p>{course.progress}% Completed</p>

                <button className="primary-btn">
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}