import React, { useState, useEffect } from "react";
import axios from "axios";

const MentorDashboard = () => {
  const [mentorInfo, setMentorInfo] = useState({
    name: "",
    expertise: "",
  });
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchMentorData();
  }, []);

  const fetchMentorData = async () => {
    try {
      const mentorResponse = await axios.get("/api/mentor/info");
      setMentorInfo(mentorResponse.data);

      const studentsResponse = await axios.get("/api/mentor/students");
      setAssignedStudents(studentsResponse.data);

      const projectsResponse = await axios.get("/api/mentor/projects");
      setProjects(projectsResponse.data);
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    }
  };

  const handleFeedbackSubmit = async (studentId, feedback) => {
    try {
      await axios.post(`/api/mentor/feedback/${studentId}`, { feedback });
      fetchMentorData(); // Refresh data after submitting feedback
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleProjectUpdate = async (projectId, updatedData) => {
    try {
      await axios.put(`/api/mentor/projects/${projectId}`, updatedData);
      fetchMentorData(); // Refresh data after updating project
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>

      {/* Mentor Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Mentor Information</h2>
        <p>
          <strong>Name:</strong> {mentorInfo.name}
        </p>
        <p>
          <strong>Expertise:</strong> {mentorInfo.expertise}
        </p>
      </div>

      {/* Assigned Students */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Assigned Students</h2>
        {assignedStudents.map((student) => (
          <div key={student.id} className="mb-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p>
              <strong>Project:</strong> {student.project}
            </p>
            <p>
              <strong>Progress:</strong> {student.progress}%
            </p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Provide Feedback</h4>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Enter feedback for the student"
                rows="3"
              ></textarea>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  handleFeedbackSubmit(student.id, "Feedback text")
                }
              >
                Submit Feedback
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Oversight */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects Oversight</h2>
        {projects.map((project) => (
          <div key={project.id} className="mb-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p>
              <strong>Student:</strong> {project.student}
            </p>
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Update Project Status</h4>
              <select
                className="w-full p-2 border rounded"
                value={project.status}
                onChange={(e) =>
                  handleProjectUpdate(project.id, { status: e.target.value })
                }
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Process */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Certification Process</h2>
        {assignedStudents.map((student) => (
          <div key={student.id} className="mb-4">
            <p>
              <strong>{student.name}</strong>
            </p>
            <p>Project Completion: {student.progress}%</p>
            <button
              className={`mt-2 px-4 py-2 rounded ${
                student.progress === 100
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              disabled={student.progress < 100}
              onClick={() => {
                // Implement certification logic
              }}
            >
              {student.progress === 100
                ? "Issue Certificate"
                : "Not Eligible for Certificate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorDashboard;
