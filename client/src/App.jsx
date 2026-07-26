import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardV2 from "./pages/DashboardV2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AIStudio from "./pages/AIStudio";
import NotFound from "./pages/NotFound";
import Editor from "./pages/Editor";
import ProtectedRoute from "./components/ProtectedRoute";

import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import Snippets from "./pages/Snippets";
import Learn from "./pages/Learn";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
             <DashboardV2 />
            </ProtectedRoute>
          }
        />
        <Route
  path="/editor"
  element={
    <ProtectedRoute>
      <Editor />
    </ProtectedRoute>
  }
/>
<Route
  path="/ai-studio"
  element={
    <ProtectedRoute>
      <AIStudio />
    </ProtectedRoute>
  }
/>

<Route
  path="/editor"
  element={
    <ProtectedRoute>
      <Editor />
    </ProtectedRoute>
  }
/>
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />
<Route
  path="/ai-studio"
  element={
    <ProtectedRoute>
      <AIStudio />
    </ProtectedRoute>
  }
/>

<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  }
/>

<Route
  path="/templates"
  element={
    <ProtectedRoute>
      <Templates />
    </ProtectedRoute>
  }
/>

<Route
  path="/snippets"
  element={
    <ProtectedRoute>
      <Snippets />
    </ProtectedRoute>
  }
/>

<Route
  path="/learn"
  element={
    <ProtectedRoute>
      <Learn />
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

<Route
  path="/billing"
  element={
    <ProtectedRoute>
      <Billing />
    </ProtectedRoute>
  }
/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;