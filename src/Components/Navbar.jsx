import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Student Incubator Program
        </Link>
        <div className="space-x-4">
          {userRole === "student" && (
            <Link to="/student">Student Dashboard</Link>
          )}
          {userRole === "mentor" && <Link to="/mentor">Mentor Dashboard</Link>}
          {userRole === "admin" && <Link to="/admin">Admin Dashboard</Link>}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
