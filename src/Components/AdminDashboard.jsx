import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [programStats, setProgramStats] = useState({
    totalStudents: 0,
    totalMentors: 0,
    totalProjects: 0,
    completionRate: 0,
  });
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsResponse = await axios.get("/api/admin/stats");
      setProgramStats(statsResponse.data);

      const studentsResponse = await axios.get("/api/admin/students");
      setStudents(studentsResponse.data);

      const mentorsResponse = await axios.get("/api/admin/mentors");
      setMentors(mentorsResponse.data);

      const projectsResponse = await axios.get("/api/admin/projects");
      setProjects(projectsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateStudent = async (id, updatedData) => {
    try {
      await axios.put(`/api/admin/students/${id}`, updatedData);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleUpdateMentor = async (id, updatedData) => {
    try {
      await axios.put(`/api/admin/mentors/${id}`, updatedData);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating mentor:", error);
    }
  };

  const handleUpdateProject = async (id, updatedData) => {
    try {
      await axios.put(`/api/admin/projects/${id}`, updatedData);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Program Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600">
            {programStats.totalStudents}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Mentors</h2>
          <p className="text-4xl font-bold text-green-600">
            {programStats.totalMentors}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
          <p className="text-4xl font-bold text-purple-600">
            {programStats.totalProjects}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Completion Rate</h2>
          <p className="text-4xl font-bold text-orange-600">
            {programStats.completionRate}%
          </p>
        </div>
      </div>

      {/* Students Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Students Management</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Mentor</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.year}</td>
                <td className="p-3">{student.specialization}</td>
                <td className="p-3">{student.project}</td>
                <td className="p-3">{student.mentor}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      // Open a modal or form to edit student details
                      // Then call handleUpdateStudent with the updated data
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mentors Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mentors Management</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Expertise</th>
              <th className="p-3 text-left">Assigned Students</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor.id}>
                <td className="p-3">{mentor.name}</td>
                <td className="p-3">{mentor.expertise}</td>
                <td className="p-3">{mentor.assignedStudents.join(", ")}</td>
                <td className="p-3">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      // Open a modal or form to edit mentor details
                      // Then call handleUpdateMentor with the updated data
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Projects Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Projects Management</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned Student</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="p-3">{project.title}</td>
                <td className="p-3">{project.description}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3">{project.assignedStudent}</td>
                <td className="p-3">
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      // Open a modal or form to edit project details
                      // Then call handleUpdateProject with the updated data
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
