import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// ... (imports remain same)
function App() {
  console.log("App component being called");
  return (
    <HashRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
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
    </HashRouter>
  );
}
export default App;
