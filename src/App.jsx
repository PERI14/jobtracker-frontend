import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/AddJob";
import EditJobs from "./pages/EditJob";
import Layout from "./components/Layout";

console.log("App.jsx file loaded");
console.log("Environment variables:", import.meta.env);

function App() {
  console.log("App component being called");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
