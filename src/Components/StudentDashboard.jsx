import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    year: "",
    specialization: "",
    project: "",
    mentor: "",
    progress: 0,
  });
  const [activeSection, setActiveSection] = useState("overview");
  const [milestones, setMilestones] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const infoResponse = await axios.get("/api/student/info");
      setStudentInfo(infoResponse.data);

      const milestonesResponse = await axios.get("/api/student/milestones");
      setMilestones(milestonesResponse.data);

      const feedbackResponse = await axios.get("/api/student/feedback");
      setFeedback(feedbackResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p>
          <strong>Name:</strong> {studentInfo.name}
        </p>
        <p>
          <strong>Year:</strong> {studentInfo.year}
        </p>
        <p>
          <strong>Specialization:</strong> {studentInfo.specialization}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <p>
          <strong>Project:</strong> {studentInfo.project}
        </p>
        <p>
          <strong>Mentor:</strong> {studentInfo.mentor}
        </p>
        <div className="mt-4">
          <p>
            <strong>Progress:</strong>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${studentInfo.progress}%` }}
            ></div>
          </div>
          <p className="text-right">{studentInfo.progress}%</p>
        </div>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Milestones</h2>
      <ul>
        {milestones.map((milestone, index) => (
          <li key={index} className="mb-4">
            <h3 className="font-semibold">{milestone.title}</h3>
            <p>Due Date: {milestone.dueDate}</p>
            <p>Status: {milestone.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderFeedback = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
      <ul>
        {feedback.map((item, index) => (
          <li key={index} className="mb-4">
            <p>
              <strong>{item.from}:</strong> {item.message}
            </p>
            <p className="text-sm text-gray-500">Date: {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="mb-6">
        <button
          onClick={() => setActiveSection("overview")}
          className={`mr-4 ${activeSection === "overview" ? "font-bold" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSection("milestones")}
          className={`mr-4 ${
            activeSection === "milestones" ? "font-bold" : ""
          }`}
        >
          Milestones
        </button>
        <button
          onClick={() => setActiveSection("feedback")}
          className={`mr-4 ${activeSection === "feedback" ? "font-bold" : ""}`}
        >
          Feedback
        </button>
      </div>
      {activeSection === "overview" && renderOverview()}
      {activeSection === "milestones" && renderMilestones()}
      {activeSection === "feedback" && renderFeedback()}
    </div>
  );
};

export default StudentDashboard;
