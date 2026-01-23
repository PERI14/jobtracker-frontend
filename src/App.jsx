import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/AddJob";
import EditJobs from "./pages/EditJob";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
