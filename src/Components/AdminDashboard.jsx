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
  const [activeSection, setActiveSection] = useState("overview");

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

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );

  const renderStudents = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Specialization</th>
            <th>Project</th>
            <th>Mentor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.year}</td>
              <td>{student.specialization}</td>
              <td>{student.project}</td>
              <td>{student.mentor}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateStudent(student.id, {
                      /* updated data */
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMentors = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expertise</th>
            <th>Assigned Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td>{mentor.name}</td>
              <td>{mentor.expertise}</td>
              <td>{mentor.assignedStudents.join(", ")}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateMentor(mentor.id, {
                      /* updated data */
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProjects = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Student</th>
            <th>Mentor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>{project.student}</td>
              <td>{project.mentor}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateProject(project.id, {
                      /* updated data */
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6">
        <button
          onClick={() => setActiveSection("overview")}
          className={`mr-4 ${activeSection === "overview" ? "font-bold" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSection("students")}
          className={`mr-4 ${activeSection === "students" ? "font-bold" : ""}`}
        >
          Students
        </button>
        <button
          onClick={() => setActiveSection("mentors")}
          className={`mr-4 ${activeSection === "mentors" ? "font-bold" : ""}`}
        >
          Mentors
        </button>
        <button
          onClick={() => setActiveSection("projects")}
          className={`mr-4 ${activeSection === "projects" ? "font-bold" : ""}`}
        >
          Projects
        </button>
      </div>
      {activeSection === "overview" && renderOverview()}
      {activeSection === "students" && renderStudents()}
      {activeSection === "mentors" && renderMentors()}
      {activeSection === "projects" && renderProjects()}
    </div>
  );
};

export default AdminDashboard;
