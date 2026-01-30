import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/AddJob";
import EditJobs from "./pages/EditJob";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

console.log("App.jsx file loaded");
console.log("Environment variables:", import.meta.env);

function App() {
  console.log("App component being called");
  return (
    <HashRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJobs />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
