// import Dashboard from "./Components/Dashboard";
// import Footer from "./Components/Footer";
// import Notifications from "./Components/Notifications";
// import ProfileModal from "./Components/ProfileModal";

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Dashboard />
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import StudentDashboard from "./Components/StudentDashboard";
import MentorDashboard from "./Components/MentorDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import Login from "./Components/Login";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {userRole && <Navbar userRole={userRole} setUserRole={setUserRole} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/student"
            element={
              userRole === "student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/mentor"
            element={
              userRole === "mentor" ? (
                <MentorDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
