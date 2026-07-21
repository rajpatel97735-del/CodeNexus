import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardV2 from "./pages/DashboardV2";
import Login from "./pages/Login";
import Register from "./pages/Register";

import NotFound from "./pages/NotFound";
import Editor from "./pages/Editor";
import ProtectedRoute from "./components/ProtectedRoute";

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
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;